import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Track name',
    nullable: false,
    example: 'Enemy JID & ID',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Artist identifier',
    nullable: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  @IsString()
  @IsOptional()
  artistId: string | null;

  @ApiProperty({
    description: 'Album identifier',
    nullable: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  @IsString()
  @IsOptional()
  albumId: string | null;

  @ApiProperty({
    description: 'Track duration',
    nullable: false,
    example: 322,
  })
  @IsNotEmpty()
  readonly duration: number;
}
