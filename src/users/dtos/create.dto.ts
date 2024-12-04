import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsEnum, IsAlpha, IsOptional, ArrayMinSize } from "class-validator";

enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: "password too weak",
  })
  password!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  lastName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Roles, { each: true })
  @ArrayMinSize(1)
  role!: Roles[];
}