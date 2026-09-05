import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationGuard } from '../authorization/guards';
import { AuthorService } from './author.service';
import type { AuthorizedRequest } from '../authorization/types';
import type { AuthorCreationDto } from './dto';

@UseGuards(AuthorizationGuard)
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('')
  public async create(
    @Req() request: AuthorizedRequest,
    @Body() data: AuthorCreationDto,
  ) {
    return await this.authorService.create(request.user.profileId, data);
  }

  @Get('/:id')
  public async getAuthor(@Param('id', ParseIntPipe) id: number) {
    return await this.authorService.getAuthor(id);
  }

  @Get('/authors/:id')
  public async getAuthors(@Param('id', ParseIntPipe) id: number) {
    return await this.authorService.getAuthors(id);
  }
}
