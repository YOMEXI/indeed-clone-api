"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const status_guard_1 = require("../gaurds/status.guard");
const jwtservice_gaurd_1 = require("../user/jwtservice/jwtservice.gaurd");
const job_service_1 = require("./job.service");
let JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    async createJob(req, res) {
        return await this.jobService.createjob(req, res);
    }
    FilteredJobs(page, count, location, exp, category) {
        const currentPg = page || 0;
        const jobsPerPg = count || 1;
        const loc = location || '';
        const experience = exp || '';
        const cat = category || '';
        return this.jobService.getJobs(currentPg, jobsPerPg, loc, experience, cat);
    }
    AllFilteredJobs(page, count, location, exp, category) {
        const currentPg = page || 0;
        const jobsPerPg = count || 1;
        const loc = location || '';
        const experience = exp || '';
        const cat = category || '';
        return this.jobService.getJobs(currentPg, jobsPerPg, loc, experience, cat);
    }
    Search(page, count, location, keyword) {
        const currentPg = page || 0;
        const jobsPerPg = Number(count) || 3;
        return this.jobService.search(currentPg, jobsPerPg, location, keyword);
    }
    jobCount() {
        return this.jobService.jobCount();
    }
    singleJob(id) {
        return this.jobService.singleJob(id);
    }
    applyForJob(jobId, req, res) {
        return this.jobService.applyForJob(jobId, req, res);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwtservice_gaurd_1.JwtGuard, status_guard_1.RecruiterStatusGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('count')),
    __param(2, (0, common_1.Query)('location')),
    __param(3, (0, common_1.Query)('exp')),
    __param(4, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "FilteredJobs", null);
__decorate([
    (0, common_1.Get)('/filter'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('count')),
    __param(2, (0, common_1.Query)('location')),
    __param(3, (0, common_1.Query)('exp')),
    __param(4, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "AllFilteredJobs", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('count')),
    __param(2, (0, common_1.Query)('location')),
    __param(3, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "Search", null);
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobController.prototype, "jobCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "singleJob", null);
__decorate([
    (0, common_1.UseGuards)(jwtservice_gaurd_1.JwtGuard),
    (0, common_1.Post)('/apply/:jobId'),
    __param(0, (0, common_1.Param)('jobId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "applyForJob", null);
JobController = __decorate([
    (0, common_1.Controller)('job'),
    __metadata("design:paramtypes", [job_service_1.jobService])
], JobController);
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map