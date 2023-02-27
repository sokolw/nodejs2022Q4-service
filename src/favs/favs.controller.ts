import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger/dist/decorators';
import { FavoritesResponse } from './classes/favorites-response';
import { AuthGuard } from 'src/core/guards/auth.guard';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites artists, albums and tracks',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: FavoritesResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Get('/')
  async getAllFavs(): Promise<FavoritesResponse> {
    return this.favsService.getAllFavs();
  }

  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "Track with id doesn't exist.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') trackId: string): Promise<void> {
    return this.favsService.addTrack(trackId);
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') trackId: string) {
    return this.favsService.delTrack(trackId);
  }

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({ name: 'id', required: true, description: 'Album identifier' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "Album with id doesn't exist.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') albumId: string): Promise<void> {
    return this.favsService.addAlbum(albumId);
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({ name: 'id', required: true, description: 'Album identifier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') albumId: string) {
    return this.favsService.delAlbum(albumId);
  }

  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({ name: 'id', required: true, description: 'Artist identifier' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "Artist with id doesn't exist.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') artistId: string): Promise<void> {
    return this.favsService.addArtist(artistId);
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({ name: 'id', required: true, description: 'Artist identifier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') artistId: string) {
    return this.favsService.delArtist(artistId);
  }
}
