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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackResponse } from './classes/track-response';
import { TrackService } from './track.service';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { AuthGuard } from 'src/core/guards/auth.guard';

@ApiTags('Track')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: TrackResponse,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Get('/')
  async getAllTracks(): Promise<Array<TrackResponse>> {
    return this.trackService.getAllTracks();
  }

  @ApiOperation({
    summary: 'Gets single track by id',
    description: 'Get single track by id',
  })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: TrackResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Get('/:id')
  async getTrackById(@Param('id') trackId: string): Promise<TrackResponse> {
    return this.trackService.getTrackById(trackId);
  }

  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiBody({
    type: CreateTrackDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful operation',
    type: TrackResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackResponse> {
    return this.trackService.createTrack(createTrackDto);
  }

  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @ApiBody({
    type: UpdateTrackDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The track has been updated.',
    type: TrackResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateTrack(
    @Param('id') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackResponse> {
    return this.trackService.updateTrack(trackId, updateTrackDto);
  }

  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
  })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delelted succesfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is missing or invalid',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') trackId: string): Promise<void> {
    return this.trackService.deleteTrack(trackId);
  }
}
