import { ApiProperty } from '@nestjs/swagger';

export class JwtResponse {
  @ApiProperty({
    description: 'Access Token',
    nullable: false,
    example: 'xxx.yyy.zzz',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh Token',
    nullable: false,
    example: 'xxx1.yyy1.zzz1',
  })
  refreshToken: string;
}
