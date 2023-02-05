import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { Album } from './interfaces/album.interface';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private artistService: AlbumService) {}

  @Get('/')
  async getAllArtists() {
    return this.artistService.getAllAlbums();
  }

  @Get('/:id')
  async getArtistById(@Param('id') albumId: string) {
    return this.artistService.getAlbumById(albumId);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createArtist(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.artistService.createAlbum(createAlbumDto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateArtist(
    @Param('id') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.artistService.updateAlbum(albumId, updateAlbumDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') albumId: string) {
    return this.artistService.deleteAlbum(albumId);
  }
}
