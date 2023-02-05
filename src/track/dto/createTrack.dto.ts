import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  readonly name: string;

  readonly artistId: string | null;

  readonly albumId: string | null;

  @IsNotEmpty()
  readonly duration: number;
}
