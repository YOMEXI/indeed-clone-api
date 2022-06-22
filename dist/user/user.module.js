"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const dotenv = require("dotenv");
dotenv.config();
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const jwtStrategy_1 = require("./jwtservice/jwtStrategy");
const jwtservice_gaurd_1 = require("./jwtservice/jwtservice.gaurd");
const status_guard_1 = require("../gaurds/status.guard");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '20d',
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.default]),
        ],
        providers: [user_service_1.UserService, jwtservice_gaurd_1.JwtGuard, jwtStrategy_1.JwtStrategy, status_guard_1.RecruiterStatusGuard],
        controllers: [user_controller_1.UserController],
        exports: [
            user_service_1.UserService,
            jwtservice_gaurd_1.JwtGuard,
            jwtStrategy_1.JwtStrategy,
            status_guard_1.RecruiterStatusGuard,
            jwt_1.JwtModule,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map