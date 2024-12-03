import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PaginationDefaultValuesPipe implements PipeTransform {
  transform(value: any, metaData: ArgumentMetadata) {
    if (value.limit && value.limit < 5) {
      throw new BadRequestException('limit must not be less than 5');
    }
    if (value.limit && value.limit > 300) {
      throw new BadRequestException('limit must not be greater than 300');
    }

    if (value.skip && value.skip < 0) {
      throw new BadRequestException('skip must not be less than 0');
    }

    if (!value.limit) {
      value.limit = 5;
    }
    if (!value.skip) {
      value.skip = 0;
    }

    return value;
  }
}
