import { Controller, SetMetadata, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../dtos/create.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserResponseExample, SigninResponse } from '../swagger/users.swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  @ApiOkResponse({ schema: { example: UserResponseExample } })
  @SetMetadata('access', ['NONE'])
  signup(@Body() dto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(dto);
  }

  @Post('/signin')
  @ApiOkResponse({ schema: { example: SigninResponse } })
  @SetMetadata('access', ['NONE'])
  signin(@Body() { uid }: LoginUserDto): Promise<any> {
    return this.usersService.createToken(uid);
  }
}
