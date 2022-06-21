import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
const nodemailer = require('nodemailer');
import { ILike } from 'typeorm';
import * as formidable from 'formidable';
import { getRepository, Repository } from 'typeorm';
import JobEntity from './job.entitiy';
import { jobDto } from './jobDto';

//

import { v2 } from 'cloudinary';
let cloudinary = v2;

cloudinary.config({
  cloud_name: String(process.env.CLOUD_NAME),
  api_key: String(process.env.API_KEY),
  api_secret: String(process.env.API_SECRET),
});
//
@Injectable()
export class jobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    private jwtService: JwtService,
  ) {}

  async createjob(req: Request, res: Response) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err: any, fields: any, files: any) => {
      const { category, companyname, jobtitle, exp, description, location } = <
        jobDto
      >fields;

      const newJob = new JobEntity();
      newJob.category = category;
      newJob.companyname = companyname;
      newJob.jobtitle = jobtitle;
      newJob.exp = exp;
      newJob.description = description;
      newJob.location = location;
      newJob.user = req.user as any;

      await getRepository(JobEntity).save(newJob);

      return res.json({ msg: 'job Created' });
    });
  }

  async getJobs(
    currentPg: number,
    jobsPerPg: number,
    location: string,
    exp: string,
    category: string,
  ) {
    return await this.jobRepository.find({
      order: { createdAt: 'DESC' },
      skip: currentPg * jobsPerPg,
      take: jobsPerPg,
      where: [
        {
          location: ILike(`%${location}%`),
          category: ILike(`%${category}%`),
          exp: ILike(`%${exp}%`),
        },
      ],
    });
  }

  async search(
    currentPg: number,
    jobsPerPg: number,
    location: string,
    keyword: string,
  ) {
    return await this.jobRepository.find({
      order: { createdAt: 'ASC' },
      skip: currentPg * jobsPerPg,
      take: jobsPerPg,
      where: [
        {
          location: ILike(`%${location}%`),

          jobtitle: ILike(`%${keyword}%`),
        },
      ],
    });
  }

  async singleJob(id: number) {
    return await this.jobRepository.findOne({ id });
  }

  async jobCount() {
    return await this.jobRepository.count();
  }

  async applyForJob(jobId: number, req: Request, res: Response) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err: any, fields: any, files: any) => {
      const { cv } = files;

      //
      const job = await this.jobRepository.findOne(
        { id: jobId },
        { relations: ['user'] },
      );
      const alreadyApplied = job.usersThatApplied.find(
        (job) => String(job.user) === String(req.user),
      );

      if (alreadyApplied) {
        return res.json({ msg: 'Aready Applied' });
      }

      if (cv) {
        cloudinary.uploader.upload(
          cv.filepath,
          {
            resource_type: 'auto',
            public_id: `findeed/user/cv/${cv.filepath}`,
            overwrite: true,
          },
          async function (error, result) {
            let usercv = result.url;
            let user = req.user;

            job.usersThatApplied.push({ cv: usercv, user: user });

            await getRepository(JobEntity).save(job);
            return res.json({
              msg: 'Thanks For applying Best of Luck',
            });
          },
        );
      }
    });
  }
}
