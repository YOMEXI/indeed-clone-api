import UserEntity from '../user/user.entity';
export declare enum STATUS {
    APPLICANT = "applicant",
    RECRUITER = "recruiter"
}
declare class JobEntity {
    id?: number;
    companyname: string;
    jobtitle: string;
    category: string;
    jobmail: string;
    description: string;
    location: string;
    exp: string;
    user: UserEntity;
    usersThatApplied: any[];
    createdAt: Date;
    updatedAt: Date;
}
export default JobEntity;
