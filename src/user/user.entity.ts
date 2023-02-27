import { hash } from 'bcrypt';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @Column({ type: 'int8' })
  createdAt: number;

  @Column({ type: 'int8' })
  updatedAt: number;

  @BeforeInsert()
  async setCreatedPasswordHash() {
    await this.setPasswordHash();
  }

  @BeforeInsert()
  async setCreatedAt() {
    const date = Date.now();
    this.createdAt = date;
    this.updatedAt = date;
  }

  @BeforeUpdate()
  async setUpdatedPasswordHash() {
    await this.setPasswordHash();
  }

  @BeforeUpdate()
  async setUpdatedAt() {
    this.updatedAt = Date.now();
  }

  async setPasswordHash() {
    this.password = await hash(this.password, +process.env.CRYPT_SALT);
  }
}
