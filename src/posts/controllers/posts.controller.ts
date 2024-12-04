import { Controller, SetMetadata, UsePipes, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiSecurity } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Posts } from '../entities/posts.entity';
import { UtilsService } from '@common/utils/utils.service';
import { PostsService } from '../services/posts.service';
import { ListResult, DeleteResult } from 'src/common/dtos/result-types.dto';
import { PaginationDefaultValuesPipe } from 'src/common/pipes/pagination-default-values.pipe';
import { ImageFixerPipe } from 'src/common/pipes/image-fixer.pipe';
import { IdParam } from 'src/common/dtos/id-param.dto';
import { PostsQueryDto } from '../dtos/posts.dto';
import { CreatePostDto } from '../dtos/create.dto';
import { UpdatePostDto } from '../dtos/update.dto';
import { PostsListResponseExample, PostResponseExample } from '../swagger/posts.swagger';
import DeleteResultResponseExample from 'src/core/swagger/examples/delete.example';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly utilsService: UtilsService,
  ) { }

  @Get()
  @ApiSecurity('bearer')
  @SetMetadata('access', ['ADMIN', 'USER'])
  @ApiOkResponse({ schema: { example: PostsListResponseExample } })
  @UsePipes(PaginationDefaultValuesPipe)
  getAll(@Query() query: PostsQueryDto): Promise<ListResult<Posts>> {
    return this.postsService.getAll(query);
  }

  @Get(':id')
  @ApiSecurity('bearer')
  @SetMetadata('access', ['ADMIN', 'USER'])
  @ApiOkResponse({ schema: { example: PostResponseExample } })
  getById(@Param() { id }: IdParam): Promise<Posts> {
    return this.postsService.getById(id);
  }

  @Post()
  @ApiSecurity('bearer')
  @SetMetadata('access', ['ADMIN'])
  @UsePipes(ImageFixerPipe)
  @ApiOkResponse({ schema: { example: PostResponseExample } })
  async create(@Body() dto: CreatePostDto): Promise<Posts> {
    if (dto.image) {
      const imageName = uuidv4();
      dto.image = this.utilsService.saveImageToHost(dto.image, imageName);
    }

    return this.postsService.create(dto);
  }

  @Put(':postId')
  @ApiSecurity('bearer')
  @SetMetadata('access', ['ADMIN'])
  @UsePipes(ImageFixerPipe)
  @ApiOkResponse({ schema: { example: PostResponseExample } })
  async update(@Body() dto: UpdatePostDto, @Param('postId') postId: number): Promise<Posts> {
    const post = await this.postsService.getById(postId);

    if (dto.image && this.utilsService.isImageSaved(post.image)) {
      dto.image = this.utilsService.overwriteImageToHost(dto.image, post.image);
    } else if (dto.image) {
      const imageName = uuidv4();
      dto.image = this.utilsService.saveImageToHost(dto.image, imageName);
    }

    return this.postsService.update(post, dto);
  }

  @Delete(':postId')
  @ApiSecurity('bearer')
  @SetMetadata('access', ['ADMIN'])
  @ApiOkResponse({ schema: { example: DeleteResultResponseExample } })
  async delete(@Param('postId') postId: number): Promise<DeleteResult> {
    const post = await this.postsService.getById(postId);
    const result = await this.postsService.delete(postId);

    this.utilsService.deleteImage(post.image);

    return result;
  }
}
