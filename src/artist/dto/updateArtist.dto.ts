import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  readonly grammy: boolean;
}
