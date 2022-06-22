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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const formidable = require("formidable");
const bcrypt = require("bcrypt");
const cloudinary_1 = require("cloudinary");
const jwt_1 = require("@nestjs/jwt");
let cloudinary = cloudinary_1.v2;
cloudinary.config({
    cloud_name: String(process.env.CLOUD_NAME),
    api_key: String(process.env.API_KEY),
    api_secret: String(process.env.API_SECRET),
});
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(req, res) {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            const { firstName, lastName, age, location, status, password, email } = fields;
            const { image } = files;
            const newUser = new user_entity_1.default();
            newUser.age = age;
            newUser.firstname = firstName;
            newUser.lastname = lastName;
            newUser.email = email;
            newUser.location = location;
            newUser.status = status;
            newUser.password = await bcrypt.hash(password, 11);
            const userExist = await this.userRepository.findOne({ email });
            if (userExist) {
                return res.status(400).json('User already registered');
            }
            if (image) {
                cloudinary.uploader.upload(image.filepath, {
                    resource_type: 'auto',
                    public_id: `findeed/user/${image.filepath}`,
                    overwrite: true,
                }, async function (error, result) {
                    newUser.imgUrl = result.url;
                    if (error)
                        res.json({ msg: 'User Creation  Failed' });
                    await (0, typeorm_2.getRepository)(user_entity_1.default).save(newUser);
                    return res.json({ msg: 'User creation Done' });
                });
            }
            else {
                await (0, typeorm_2.getRepository)(user_entity_1.default).save(newUser);
                return res.json({ msg: 'User Created !!' });
            }
        });
    }
    async login(user, res) {
        const { email, password } = user;
        let userInfo = await this.userRepository.findOne({ email });
        if (!userInfo || !(await bcrypt.compare(password, userInfo.password))) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'Email or Password is incorrect',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        else {
            userInfo.password = '';
            const token = await this.jwtService.signAsync({ userInfo });
            return { token, userInfo };
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map