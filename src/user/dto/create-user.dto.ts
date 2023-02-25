import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User login',
    nullable: false,
    example: 'testLogin1',
  })
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
    example: 'testPss',
  })
  @IsNotEmpty()
  readonly password: string;
}
