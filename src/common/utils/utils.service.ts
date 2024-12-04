import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { configService } from '@core/config/config.service';

@Injectable()
export class UtilsService {
  constructor() { }

  //#region image methods
  saveImageToHost(image: string, name: string): string {
    const imagesPath = {
      posts: `${configService.getImagePath()}/images/posts`,
    };

    // check images folder exist and create that if is not exist yet
    if (!existsSync(`${configService.getImagePath()}/images`)) {
      mkdirSync(`${configService.getImagePath()}/images`);
    }
    // check sub directories of images folder exist and create them if there not exist yet
    Object.values(imagesPath).map(path => {
      if (!existsSync(path)) {
        mkdirSync(path);
      }
    });

    const picture = Buffer.from(image, 'base64');
    writeFileSync(`${imagesPath.posts}/${name}.jpg`, picture);

    return `${imagesPath.posts}/${name}.jpg`;
  }

  overwriteImageToHost(image: string, imagePath: string): string {
    // check images folder exist and create that if is not exist yet
    if (!existsSync(imagePath)) {
      mkdirSync(imagePath);
    }

    const picture = Buffer.from(image, 'base64');
    writeFileSync(imagePath, picture);

    return imagePath;
  }

  deleteImage(path: string): void {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  }

  isImageSaved(path: string) {
    return path.includes(configService.getImagePath());
  }
  //#endregion
}
