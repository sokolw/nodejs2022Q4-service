import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe())
  async signup(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.createUser(createUserDto);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: CreateUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/refresh')
  async refresh() {
    return 'refresh';
  }
}
