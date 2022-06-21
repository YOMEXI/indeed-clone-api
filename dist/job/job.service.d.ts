import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import JobEntity from './job.entitiy';
export declare class jobService {
    private readonly jobRepository;
    private jwtService;
    constructor(jobRepository: Repository<JobEntity>, jwtService: JwtService);
    createjob(req: Request, res: Response): Promise<void>;
    getJobs(currentPg: number, jobsPerPg: number, location: string, exp: string, category: string): Promise<JobEntity[]>;
    search(currentPg: number, jobsPerPg: number, location: string, keyword: string): Promise<JobEntity[]>;
    singleJob(id: number): Promise<JobEntity>;
    jobCount(): Promise<number>;
    applyForJob(jobId: number, req: Request, res: Response): Promise<void>;
}
