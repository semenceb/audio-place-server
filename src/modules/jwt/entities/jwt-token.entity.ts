import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_token')
export class JwtTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  refreshToken: string;

  constructor(userId: number, refreshToken: string) {
    this.userId = userId;
    this.refreshToken = refreshToken;
  }
}
