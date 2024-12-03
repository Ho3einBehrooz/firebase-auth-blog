import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageFixerPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    this.iterateObject(value);

    return value;
  }

  iterateObject(obj) {
    if (obj) {
      Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') {
          return this.iterateObject(obj[key]);
        }

        const regex = /data:image\/(\w*);base64,/m;
        if (regex.test(obj[key])) {
          const [match] = regex.exec(obj[key]);
          obj[key] = obj[key].replace(match, '');
        }
      });
    }
  }
}
