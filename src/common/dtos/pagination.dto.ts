import { IsOptional, IsNotEmpty, IsNumberString, IsIn } from 'class-validator';

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  skip?: number;

  @IsOptional()
  @IsIn(Object.values(SortEnum))
  sort?: SortEnum = SortEnum.ASC;
}
