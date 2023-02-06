import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    description: 'Track identifier',
    nullable: false,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Track name',
    nullable: false,
    example: 'Enemy JID & ID',
  })
  name: string;

  @ApiProperty({
    description: 'Artist identifier',
    nullable: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  artistId: string | null;

  @ApiProperty({
    description: 'Album identifier',
    nullable: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Track duration',
    nullable: false,
    example: 322,
  })
  duration: number;
}
