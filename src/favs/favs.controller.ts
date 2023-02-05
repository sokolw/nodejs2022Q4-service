import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get('/')
  async getAllFavs() {
    return this.favsService.getAllFavs();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') trackId: string): Promise<void> {
    return this.favsService.addTrack(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') trackId: string) {
    return this.favsService.delTrack(trackId);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') albumId: string): Promise<void> {
    return this.favsService.addAlbum(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') albumId: string) {
    return this.favsService.delAlbum(albumId);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') artistId: string): Promise<void> {
    return this.favsService.addArtist(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') artistId: string) {
    return this.favsService.delArtist(artistId);
  }
}
