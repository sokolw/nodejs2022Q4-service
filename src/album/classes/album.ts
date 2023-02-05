import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    description: 'Album identifier',
    nullable: false,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Album name',
    nullable: false,
    example: 'pojiloy flexer',
  })
  name: string;

  @ApiProperty({
    description: 'Album year',
    nullable: false,
    example: 2301,
  })
  year: number;

  @ApiProperty({
    description: 'Artist identifier',
    nullable: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  artistId: string | null;
}
