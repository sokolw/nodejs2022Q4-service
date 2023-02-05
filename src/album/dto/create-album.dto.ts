import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Album name',
    nullable: false,
    example: 'Dark moon',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Album year',
    nullable: false,
    example: 2000,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Artist identifier',
    nullable: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  artistId: string | null;
}
