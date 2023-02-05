import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { Artist } from './interfaces/artist.interface';

@UseGuards(AuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('/')
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  async getArtistById(@Param('id') trackId: string) {
    return this.artistService.getArtistById(trackId);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createArtist(@Body() createTrackDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(createTrackDto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateArtist(
    @Param('id') trackId: string,
    @Body() updateTrackDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(trackId, updateTrackDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') trackId: string) {
    return this.artistService.deleteArtist(trackId);
  }
}
