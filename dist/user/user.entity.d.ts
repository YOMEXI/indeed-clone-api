import JobEntity from '../job/job.entitiy';
export declare enum STATUS {
    APPLICANT = "applicant",
    RECRUITER = "recruiter"
}
declare class UserEntity {
    id?: number;
    email: string;
    firstname: string;
    lastname: string;
    location: string;
    age: number;
    imgUrl: string;
    status: STATUS;
    password: string;
    jobs: JobEntity[];
    createdAt: Date;
    updatedAt: Date;
}
export default UserEntity;
