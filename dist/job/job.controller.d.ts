import { Request, Response } from 'express';
import { jobService } from './job.service';
export declare class JobController {
    jobService: jobService;
    constructor(jobService: jobService);
    createJob(req: Request, res: Response): Promise<void>;
    FilteredJobs(page: number, count: number, location: string, exp: string, category: string): Promise<import("./job.entitiy").default[]>;
    AllFilteredJobs(page: number, count: number, location: string, exp: string, category: string): Promise<import("./job.entitiy").default[]>;
    Search(page: number, count: number, location: string, keyword: string): Promise<import("./job.entitiy").default[]>;
    jobCount(): Promise<number>;
    singleJob(id: number): Promise<import("./job.entitiy").default>;
    applyForJob(jobId: number, req: Request, res: Response): Promise<void>;
}
