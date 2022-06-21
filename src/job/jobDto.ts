import { IsNotEmpty } from 'class-validator';

export class jobDto {
  companyname: string;

  jobtitle: string;

  category: string;

  description: string;

  location: string;

  exp: string;
}
