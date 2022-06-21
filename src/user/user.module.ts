import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import UserEntity from './user.entity';
import { UserService } from './user.service';
import { JwtStrategy } from './jwtservice/jwtStrategy';
import { JwtGuard } from './jwtservice/jwtservice.gaurd';
import { RecruiterStatusGuard } from '../gaurds/status.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '20d',
      },
    }),

    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, JwtGuard, JwtStrategy, RecruiterStatusGuard],
  controllers: [UserController],
  exports: [
    UserService,
    JwtGuard,
    JwtStrategy,
    RecruiterStatusGuard,
    JwtModule,
  ],
})
export class UserModule {}
