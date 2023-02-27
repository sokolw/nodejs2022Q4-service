import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    nullable: false,
    example: 'xxx.yyy.zzz',
  })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}
