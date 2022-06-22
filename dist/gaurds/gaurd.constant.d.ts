export declare enum STATUS {
    APPLICANT = "applicant",
    RECRUITER = "recruiter"
}
export declare const STATUS_KEY = "status";
export declare const Status: (...status: STATUS[]) => import("@nestjs/common").CustomDecorator<string>;
