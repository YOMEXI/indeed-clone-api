import { SetMetadata } from '@nestjs/common';

export enum STATUS {
  APPLICANT = 'applicant',
  RECRUITER = 'recruiter',
}

export const STATUS_KEY = 'status';
export const Status = (...status: STATUS[]) => SetMetadata(STATUS_KEY, status);
