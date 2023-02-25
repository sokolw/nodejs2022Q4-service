import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'User login',
    nullable: false,
    example: 'some user login',
  })
  login: string;

  @ApiProperty({
    description: 'User identifier',
    nullable: false,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({ description: 'User version', nullable: false, example: 1 })
  version: number;

  @ApiProperty({
    description: 'User createdAt',
    nullable: false,
    example: 1655000000,
  })
  createdAt: number;

  @ApiProperty({
    description: 'User updatedAt',
    nullable: false,
    example: 1655000000,
  })
  updatedAt: number;
}
