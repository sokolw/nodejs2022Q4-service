import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { SignupResponse } from './classes/signup-response';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtResponse } from './classes/jwt-response';
import { ValidationJwtTokenPipe } from './pipes/validation-jwt-token.pipe';
import { AuthGuard } from 'src/core/guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Signup',
    description: 'Signup a user',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful signup',
    type: SignupResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict. Login already exists',
  })
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async signup(@Body() createUserDto: CreateUserDto): Promise<SignupResponse> {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Logins a user and returns a JWT-tokens',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful login.',
    type: JwtResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Incorrect login or password.',
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: CreateUserDto): Promise<JwtResponse> {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({
    summary: 'Refresh',
    description: 'Refresh a user tokens and returns a new JWT-tokens',
  })
  @ApiBody({
    type: RefreshTokenDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful are tokens updated.',
    type: JwtResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. (refreshToken field is required)',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Refresh token is invalid or expired.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'RefreshToken in body  is missing or invalid. Access token is missing or invalid.',
  })
  @Post('/refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationJwtTokenPipe())
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<JwtResponse> {
    return this.authService.refresh(refreshTokenDto);
  }
}
