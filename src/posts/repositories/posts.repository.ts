import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import * as PostsList from '../entities/posts.json';
import { Posts } from '../entities/posts.entity';
import { configService } from '@core/config/config.service';
import { ListResult } from '@common/dtos/result-types.dto';
import { PostsQueryDto } from '../dtos/posts.dto';
import { CreatePostDto } from '../dtos/create.dto';
import { UpdatePostDto } from '../dtos/update.dto';

@Injectable()
export class PostsRepository implements OnModuleInit {
  constructor(
    @InjectRepository(Posts, configService.getDataBaseName())
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async getAll(dto: PostsQueryDto): Promise<ListResult<Posts>> {
    const { limit: take, skip, sort, title, createdFrom, createdTo } = dto;

    const query = this.postsRepository
      .createQueryBuilder('blogs')
      .take(take)
      .skip(skip)
      .orderBy('blogs.createdAt', sort);

    if (title) {
      query.where({ title: ILike(`%${title}%`) });
    }

    if (createdFrom) {
      query.andWhere({ createdAt: MoreThanOrEqual(createdFrom) });
    }
    if (createdTo) {
      query.andWhere({ createdAt: LessThanOrEqual(createdTo) });
    }

    const [posts, count] = await query.getManyAndCount();

    return {
      data: posts,
      count,
    };
  }

  getById(id: number): Promise<Posts> {
    return this.postsRepository.findOne({ where: { id } });
  }

  async create(dto: CreatePostDto): Promise<Posts> {
    const post = this.postsRepository.create(dto);

    return await this.postsRepository.save<Posts>(post);
  }

  async update(post: Posts, dto: UpdatePostDto): Promise<Posts> {
    const { title, content, image } = dto;

    if (title) post.title = title;
    if (content) post.content = content;
    if (image) post.image = image;

    return await this.postsRepository.save<Posts>(post);
  }

  delete(postId: number): Promise<DeleteResult> {
    return this.postsRepository.delete({ id: postId });
  }

  async onModuleInit(): Promise<void> {
    // Add test posts to database if not exist
    const posts = await this.postsRepository.find({});
    if (posts.length === 0) {
      await Promise.all(
        PostsList.map(async (post) => {
          const postEntity = this.postsRepository.create({
            title: post.title,
            content: post.content,
            image: post.image,
          });
          this.postsRepository.save<Posts>(postEntity);
        }),
      );
    }
  }
}
