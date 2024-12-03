import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, IsDateString, IsEnum } from 'class-validator';
import { PaginationDto, SortEnum } from '@common/dtos/pagination.dto';

export class PostsQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: Object.values(SortEnum), default: SortEnum.ASC })
  @IsOptional()
  @IsEnum(Object.values(SortEnum))
  sort?: SortEnum = SortEnum.DESC;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdFrom?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdTo?: Date;
}
