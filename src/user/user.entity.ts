import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import JobEntity from '../job/job.entitiy';

export enum STATUS {
  APPLICANT = 'applicant',
  RECRUITER = 'recruiter',
}

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public location: string;

  @Column()
  public age: number;

  @Column({ default: '' })
  public imgUrl: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.APPLICANT,
  })
  status: STATUS;

  @Column()
  public password: string;

  @OneToMany(() => JobEntity, (jobEntity) => jobEntity.user)
  jobs: JobEntity[];


  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

export default UserEntity;
