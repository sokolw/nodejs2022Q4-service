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
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserResponse } from './types/user-response.type';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/user')
  async getAllUsers(): Promise<Array<UserResponse>> {
    return this.userService.getAllUsers();
  }

  @Get('/user/:id')
  async getUserById(@Param('id') userId: string): Promise<UserResponse> {
    return this.userService.getUserById(userId);
  }

  @Post('/user')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/user/:id')
  @UsePipes(new ValidationPipe())
  async updateUserPassword(
    @Param('id') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updateUserPassword(userId, updatePasswordDto);
  }

  @Delete('/user/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
