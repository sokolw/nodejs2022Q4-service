import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    description: 'Artist identifier',
    nullable: false,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Artist name',
    nullable: false,
    example: 'Barakuda',
  })
  name: string;

  @ApiProperty({
    description: 'Have grammy',
    nullable: false,
    example: false,
  })
  grammy: boolean;
}
