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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './classes/artist';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger/dist/decorators';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOperation({
    summary: 'Get all artists',
    description: 'Gets all artists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Artist,
    isArray: true,
  })
  @Get('/')
  async getAllArtists(): Promise<Array<Artist>> {
    return this.artistService.getAllArtists();
  }

  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiParam({ name: 'id', required: true, description: 'Artist identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist not found',
  })
  @Get('/:id')
  async getArtistById(@Param('id') artistId: string): Promise<Artist> {
    return this.artistService.getArtistById(artistId);
  }

  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
  })
  @ApiBody({
    type: CreateArtistDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful operation',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiParam({ name: 'id', required: true, description: 'Artist identifier' })
  @ApiBody({
    type: UpdateArtistDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The artist has been updated.',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist was not found.',
  })
  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateArtist(
    @Param('id') artistId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(artistId, updateArtistDto);
  }

  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
  })
  @ApiParam({ name: 'id', required: true, description: 'Artist identifier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist was not found.',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') artistId: string): Promise<void> {
    return this.artistService.deleteArtist(artistId);
  }
}
