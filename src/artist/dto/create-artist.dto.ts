import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'Artist name',
    nullable: false,
    example: 'White Bread',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Artist grammy',
    nullable: false,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly grammy: boolean;
}
