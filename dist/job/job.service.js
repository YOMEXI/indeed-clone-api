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
exports.jobService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const nodemailer = require('nodemailer');
const typeorm_2 = require("typeorm");
const formidable = require("formidable");
const typeorm_3 = require("typeorm");
const job_entitiy_1 = require("./job.entitiy");
const cloudinary_1 = require("cloudinary");
let cloudinary = cloudinary_1.v2;
cloudinary.config({
    cloud_name: String(process.env.CLOUD_NAME),
    api_key: String(process.env.API_KEY),
    api_secret: String(process.env.API_SECRET),
});
let jobService = class jobService {
    constructor(jobRepository, jwtService) {
        this.jobRepository = jobRepository;
        this.jwtService = jwtService;
    }
    async createjob(req, res) {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            const { category, companyname, jobtitle, exp, description, location } = fields;
            const newJob = new job_entitiy_1.default();
            newJob.category = category;
            newJob.companyname = companyname;
            newJob.jobtitle = jobtitle;
            newJob.exp = exp;
            newJob.description = description;
            newJob.location = location;
            newJob.user = req.user;
            await (0, typeorm_3.getRepository)(job_entitiy_1.default).save(newJob);
            return res.json({ msg: 'job Created' });
        });
    }
    async getJobs(currentPg, jobsPerPg, location, exp, category) {
        return await this.jobRepository.find({
            order: { createdAt: 'DESC' },
            skip: currentPg * jobsPerPg,
            take: jobsPerPg,
            where: [
                {
                    location: (0, typeorm_2.ILike)(`%${location}%`),
                    category: (0, typeorm_2.ILike)(`%${category}%`),
                    exp: (0, typeorm_2.ILike)(`%${exp}%`),
                },
            ],
        });
    }
    async search(currentPg, jobsPerPg, location, keyword) {
        return await this.jobRepository.find({
            order: { createdAt: 'ASC' },
            skip: currentPg * jobsPerPg,
            take: jobsPerPg,
            where: [
                {
                    location: (0, typeorm_2.ILike)(`%${location}%`),
                    jobtitle: (0, typeorm_2.ILike)(`%${keyword}%`),
                },
            ],
        });
    }
    async singleJob(id) {
        return await this.jobRepository.findOne({ id });
    }
    async jobCount() {
        return await this.jobRepository.count();
    }
    async applyForJob(jobId, req, res) {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            const { cv } = files;
            const job = await this.jobRepository.findOne({ id: jobId }, { relations: ['user'] });
            const alreadyApplied = job.usersThatApplied.find((job) => String(job.user) === String(req.user));
            if (alreadyApplied) {
                return res.json({ msg: 'Aready Applied' });
            }
            if (cv) {
                cloudinary.uploader.upload(cv.filepath, {
                    resource_type: 'auto',
                    public_id: `findeed/user/cv/${cv.filepath}`,
                    overwrite: true,
                }, async function (error, result) {
                    let usercv = result.url;
                    let user = req.user;
                    job.usersThatApplied.push({ cv: usercv, user: user });
                    await (0, typeorm_3.getRepository)(job_entitiy_1.default).save(job);
                    return res.json({
                        msg: 'Thanks For applying Best of Luck',
                    });
                });
            }
        });
    }
};
jobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entitiy_1.default)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        jwt_1.JwtService])
], jobService);
exports.jobService = jobService;
//# sourceMappingURL=job.service.js.map