import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User login',
    nullable: false,
    example: 'testLogin1',
  })
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
    example: 'testPss',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
