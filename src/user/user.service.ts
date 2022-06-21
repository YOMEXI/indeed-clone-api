import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import UserEntity from './user.entity';

//
import * as formidable from 'formidable';
import * as bcrypt from 'bcrypt';
import { v2 } from 'cloudinary';
import { JwtService } from '@nestjs/jwt';
import { userDto } from './userDto';
let cloudinary = v2;

cloudinary.config({
  cloud_name: String(process.env.CLOUD_NAME),
  api_key: String(process.env.API_KEY),
  api_secret: String(process.env.API_SECRET),
});

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(req: Request, res: Response) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err: any, fields: any, files: any) => {
      const { firstName, lastName, age, location, status, password, email } =
        fields;

      const { image } = files;

      //
      const newUser = new UserEntity();
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

      //
      if (image) {
        cloudinary.uploader.upload(
          image.filepath,
          {
            resource_type: 'auto',
            public_id: `findeed/user/${image.filepath}`,
            overwrite: true,
          },
          async function (error, result) {
            newUser.imgUrl = result.url;
            if (error) res.json({ msg: 'User Creation  Failed' });
            await getRepository(UserEntity).save(newUser);
            return res.json({ msg: 'User creation Done' });
          },
        );
      } else {
        await getRepository(UserEntity).save(newUser);
        return res.json({ msg: 'User Created !!' });
      }
    });

    //
  }

  //
  async login(user: userDto, res: Response): Promise<any> {
    const { email, password } = user;

    let userInfo = await this.userRepository.findOne({ email });

    if (!userInfo || !(await bcrypt.compare(password, userInfo.password))) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Email or Password is incorrect',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      userInfo.password = '';
      const token = await this.jwtService.signAsync({ userInfo });

      return { token, userInfo };
    }

    //
  }
}
