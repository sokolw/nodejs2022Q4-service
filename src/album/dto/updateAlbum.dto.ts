import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  artistId: string | null;
}
