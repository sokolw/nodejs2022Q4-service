import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: "Old user's password ",
    nullable: false,
    example: 'testPss',
  })
  @IsNotEmpty()
  readonly oldPassword: string;

  @ApiProperty({
    description: "New user's password ",
    nullable: false,
    example: 'testPssNew',
  })
  @IsNotEmpty()
  readonly newPassword: string;
}
