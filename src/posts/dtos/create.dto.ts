import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsOptional, Matches } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/data:image\/(\w*);base64,/m, { message: 'image must be base64' })
  image?: string;

  @IsOptional()
  @IsDateString()
  createdAt!: Date;
}
