import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntity from '../user/user.entity';

export enum STATUS {
  APPLICANT = 'applicant',
  RECRUITER = 'recruiter',
}

@Entity()
class JobEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  companyname: string;

  @Column()
  public jobtitle: string;

  @Column()
  public category: string;

  @Column({ default: '' })
  public jobmail: string;

  @Column()
  public description: string;

  @Column({ default: '' })
  public location: string;

  @Column()
  public exp: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.jobs)
  user: UserEntity;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  public usersThatApplied: any[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

export default JobEntity;
