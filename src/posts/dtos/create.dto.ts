import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

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
  @IsString()
  image?: string;

  @IsOptional()
  @IsDateString()
  createdAt!: Date;
}
