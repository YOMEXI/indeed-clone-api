import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Status } from '../gaurds/gaurd.constant';
import { RecruiterStatusGuard } from '../gaurds/status.guard';
import { JwtGuard } from '../user/jwtservice/jwtservice.gaurd';
import { jobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(public jobService: jobService) {}

  @UseGuards(JwtGuard, RecruiterStatusGuard)
  @Post('create')
  async createJob(@Req() req: Request, @Res() res: Response) {
    return await this.jobService.createjob(req, res);
  }

  // @UseGuards(JwtGuard, RecruiterStatusGuard)
  @Get('/')
  FilteredJobs(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('location') location: string,
    @Query('exp') exp: string,
    @Query('category') category: string,
  ) {
    const currentPg = page || 0;
    const jobsPerPg = count || 1;
    const loc = location || '';
    const experience = exp || '';
    const cat = category || '';
    return this.jobService.getJobs(currentPg, jobsPerPg, loc, experience, cat);
  }

  @Get('/filter')
  AllFilteredJobs(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('location') location: string,
    @Query('exp') exp: string,
    @Query('category') category: string,
  ) {
    const currentPg = page || 0;
    const jobsPerPg = count || 1;
    const loc = location || '';
    const experience = exp || '';
    const cat = category || '';
    return this.jobService.getJobs(currentPg, jobsPerPg, loc, experience, cat);
  }

  @Get('search')
  Search(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('location') location: string,
    @Query('keyword') keyword: string,
  ) {
    const currentPg = page || 0;
    const jobsPerPg = Number(count) || 3;
    return this.jobService.search(currentPg, jobsPerPg, location, keyword);
  }

  @Get('count')
  jobCount() {
    return this.jobService.jobCount();
  }

  @Get(':id')
  singleJob(@Param('id') id: number) {
    return this.jobService.singleJob(id);
  }

  @UseGuards(JwtGuard)
  @Post('/apply/:jobId')
  applyForJob(
    @Param('jobId') jobId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.jobService.applyForJob(jobId, req, res);
  }
}
