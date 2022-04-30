import { Controller, Get, Param } from '@nestjs/common';
import { ResponseMessage } from '@calibre-webapp/datatype';
import { TagService } from '../database/services/tag.service';
import { PaginationParams } from '../shared/validators/pagination-params.validator';
import { FindBookByObjectIdParams } from '../shared/validators/find-books-by-author-params.validator';
import { BookService } from '../database/services/book.service';

@Controller('tags')
export class TagController {
    constructor(private tagService: TagService, private bookService: BookService) {}

    @Get('count')
    public async count(): Promise<ResponseMessage> {
        return {
            code: 'SUCCEEDED',
            action: 'COUNT_TAG',
            data: await this.tagService.count(),
        };
    }

    @Get('list')
    public async getTags(): Promise<ResponseMessage> {
        const tags = await this.tagService.findTags();
        return {
            code: 'SUCCEEDED',
            action: 'GET_AUTHORS',
            data: {
                tags,
                total: tags.length,
            },
        };
    }

    @Get(':id/books/:page/:limit')
    public async findBooksByAuthorId(@Param() { id, page, limit }: FindBookByObjectIdParams): Promise<ResponseMessage> {
        const [books, total] = await this.bookService.findBooksByTagId(id, page, limit);
        return {
            code: 'SUCCEEDED',
            action: 'GET_BOOKS_BY_AUTHOR',
            data: {
                books,
                total,
            },
        };
    }
}
