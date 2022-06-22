import { Request, Response } from 'express';
import { UserService } from './user.service';
import { userDto } from './userDto';
export declare class UserController {
    userService: UserService;
    constructor(userService: UserService);
    Register(req: Request, res: Response): Promise<void>;
    Login(user: userDto, res: Response): Promise<{
        user: any;
        msg: string;
    }>;
    UserDetails(req: Request, res: Response): Promise<void>;
    logout(res: Response): Response<any, Record<string, any>>;
}
