import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtGuard } from './jwtservice/jwtservice.gaurd';

//
import { UserService } from './user.service';
import { userDto } from './userDto';

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}

  @Post('register')
  async Register(@Req() req: Request, @Res() res: Response) {
    return await this.userService.register(req, res);
  }

  //

  @Post('login')
  async Login(
    @Body() user: userDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const value = await this.userService.login(user, res);

    res.cookie('token', value.token, {
      //for browser testing and production
      sameSite: 'none',
      maxAge: 3600000 * 60,
      path: '/',
      httpOnly: process.env.NODE_ENV === 'production' ? true : false,
      secure: true,
      // // for postman testing
      // httpOnly: process.env.NODE_ENV === 'production' ? true : false,
      // secure: process.env.NODE_ENV === 'production' ? true : false,
    });

    return { user: value.userInfo, msg: 'Welcome' };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async UserDetails(@Req() req: Request, @Res() res: Response) {
    res.json({ user: req.user });
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.cookie('token', '', { expires: new Date() });
    return res.json({ msg: 'Logged out' });
  }
}
