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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwtservice_gaurd_1 = require("./jwtservice/jwtservice.gaurd");
const user_service_1 = require("./user.service");
const userDto_1 = require("./userDto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async Register(req, res) {
        return await this.userService.register(req, res);
    }
    async Login(user, res) {
        const value = await this.userService.login(user, res);
        res.cookie('token', value.token, {
            sameSite: 'none',
            maxAge: 3600000 * 60,
            path: '/',
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            secure: true,
        });
        return { user: value.userInfo, msg: 'Welcome' };
    }
    async UserDetails(req, res) {
        res.json({ user: req.user });
    }
    logout(res) {
        res.cookie('token', '', { expires: new Date() });
        return res.json({ msg: 'Logged out' });
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userDto_1.userDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Login", null);
__decorate([
    (0, common_1.UseGuards)(jwtservice_gaurd_1.JwtGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UserDetails", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map