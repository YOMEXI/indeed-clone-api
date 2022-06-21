"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const dotenv = require("dotenv");
dotenv.config();
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwtStrategy_1 = require("../user/jwtservice/jwtStrategy");
const user_module_1 = require("../user/user.module");
const job_controller_1 = require("./job.controller");
const job_entitiy_1 = require("./job.entitiy");
const job_service_1 = require("./job.service");
let JobModule = class JobModule {
};
JobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([job_entitiy_1.default]),
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: `${process.env.JWT_SECRET}`,
                signOptions: {
                    expiresIn: `${process.env.JWT_EXPIRY}`,
                },
            }),
        ],
        controllers: [job_controller_1.JobController],
        providers: [job_service_1.jobService, jwt_1.JwtService, jwtStrategy_1.JwtStrategy],
        exports: [jwtStrategy_1.JwtStrategy, jwtStrategy_1.JwtStrategy, job_service_1.jobService],
    })
], JobModule);
exports.JobModule = JobModule;
//# sourceMappingURL=job.module.js.map