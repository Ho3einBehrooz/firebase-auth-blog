import { Controller, SetMetadata, UsePipes, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiSecurity } from '@nestjs/swagger';
import { Posts } from '../entities/posts.entity';
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
  constructor(private readonly postsService: PostsService) { }

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
  create(@Body() dto: CreatePostDto): Promise<Posts> {
    return this.postsService.create(dto);
  }

  @Put(':postId')
  @ApiSecurity('bearer')
  @SetMetadata('access', ['ADMIN'])
  @UsePipes(ImageFixerPipe)
  @ApiOkResponse({ schema: { example: PostResponseExample } })
  update(@Body() dto: UpdatePostDto, @Param('postId') postId: number): Promise<Posts> {
    return this.postsService.update(postId, dto);
  }

  @Delete(':postId')
  @ApiSecurity('bearer')
  @SetMetadata('access', ['ADMIN'])
  @ApiOkResponse({ schema: { example: DeleteResultResponseExample } })
  delete(@Param('postId') postId: number): Promise<DeleteResult> {
    return this.postsService.delete(postId);
  }
}
