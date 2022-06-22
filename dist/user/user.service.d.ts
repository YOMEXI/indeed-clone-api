import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import UserEntity from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { userDto } from './userDto';
export declare class UserService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    register(req: Request, res: Response): Promise<void>;
    login(user: userDto, res: Response): Promise<any>;
}
