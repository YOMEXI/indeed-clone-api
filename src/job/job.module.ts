import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruiterStatusGuard } from '../gaurds/status.guard';
import { JwtGuard } from '../user/jwtservice/jwtservice.gaurd';
import { JwtStrategy } from '../user/jwtservice/jwtStrategy';
import { UserModule } from '../user/user.module';
import { JobController } from './job.controller';
import JobEntity from './job.entitiy';
import { jobService } from './job.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity]),
    UserModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: `${process.env.JWT_EXPIRY}`,
      },
    }),
  ],
  controllers: [JobController],
  providers: [jobService, JwtService, JwtStrategy],
  exports: [JwtStrategy, JwtStrategy, jobService],
})
export class JobModule {}
