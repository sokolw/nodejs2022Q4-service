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
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './classes/album';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger/dist/decorators';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library alibums list',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Album,
    isArray: true,
  })
  @Get('/')
  async getAllAlbums(): Promise<Array<Album>> {
    return this.albumService.getAllAlbums();
  }

  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiParam({ name: 'id', required: true, description: 'Album identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  @Get('/:id')
  async getAlbumById(@Param('id') albumId: string): Promise<Album> {
    return this.albumService.getAlbumById(albumId);
  }

  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiBody({
    type: CreateAlbumDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Almub is created',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({ name: 'id', required: true, description: 'Album identifier' })
  @ApiBody({
    type: UpdateAlbumDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The album has been updated.',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateAlbum(
    @Param('id') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(albumId, updateAlbumDto);
  }

  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiParam({ name: 'id', required: true, description: 'Album identifier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delelted succesfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') albumId: string): Promise<void> {
    return this.albumService.deleteAlbum(albumId);
  }
}
