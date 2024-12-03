import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PinoLoggerService } from '@core/logger/logger.service';
import { Posts } from '../entities/posts.entity';
import { PostsRepository } from '../repositories/posts.repository';
import { ListResult, DeleteResult } from '@common/dtos/result-types.dto';
import { PostsQueryDto } from '../dtos/posts.dto';
import { CreatePostDto } from '../dtos/create.dto';
import { UpdatePostDto } from '../dtos/update.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly blogsRepository: PostsRepository,
    private readonly loggerService: PinoLoggerService,
  ) {}

  async getAll(query: PostsQueryDto): Promise<ListResult<Posts>> {
    const { data, count } = await this.blogsRepository.getAll(query);

    return {
      data: plainToInstance(Posts, data),
      count,
    };
  }

  async getById(id: number): Promise<Posts> {
    const post = await this.blogsRepository.getById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }

    return plainToInstance(Posts, post);
  }

  async create(dto: CreatePostDto): Promise<Posts> {
    try {
      const newPost = await this.blogsRepository.create(dto);

      return plainToInstance(Posts, newPost);
    } catch (error) {
      this.loggerService.error(error);

      throw new InternalServerErrorException('create post unsuccessful');
    }
  }

  async update(postId: number, dto: UpdatePostDto): Promise<Posts> {
    const post = await this.getById(postId);

    try {
      const updatedPost = await this.blogsRepository.update(post, dto);

      return plainToInstance(Posts, updatedPost);
    } catch (error) {
      this.loggerService.error(error);

      throw new InternalServerErrorException('update post unsuccessful');
    }
  }

  async delete(postId: number): Promise<DeleteResult> {
    await this.getById(postId);

    try {
      await this.blogsRepository.delete(postId);

      return { status: true };
    } catch (error) {
      this.loggerService.error(error);

      throw new InternalServerErrorException('delete post was unsuccessful');
    }
  }
}
