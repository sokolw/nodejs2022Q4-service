import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './classes/user-response';
import { UserService } from './user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: UserResponse,
    isArray: true,
  })
  @Get('/user')
  async getAllUsers(): Promise<Array<UserResponse>> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @Get('/user/:id')
  async getUserById(@Param('id') userId: string): Promise<UserResponse> {
    return this.userService.getUserById(userId);
  }

  @ApiOperation({
    summary: 'Creates user',
    description: 'Creates a new user',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been created.',
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict. Login already exists',
  })
  @Post('/user')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiBody({
    type: UpdatePasswordDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been updated.',
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Old password is wrong',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @Put('/user/:id')
  @UsePipes(new ValidationPipe())
  async updateUserPassword(
    @Param('id') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updateUserPassword(userId, updatePasswordDto);
  }

  @ApiOperation({
    summary: 'Deletes user',
    description: 'Deletes user by ID.',
  })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user has been deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @Delete('/user/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
