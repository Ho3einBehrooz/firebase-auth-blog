import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image?: string;
}
