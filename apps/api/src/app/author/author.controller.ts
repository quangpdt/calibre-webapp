import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from '../database/services/author.service';
import { ResponseMessage } from '@calibre-webapp/datatype';
import { FindOneParams } from '../shared/validators/find-one-params.validator';
import { PaginationParams } from '../shared/validators/pagination-params.validator';
import { BookService } from '../database/services/book.service';
import { FindBookByObjectIdParams } from '../shared/validators/find-books-by-author-params.validator';

@Controller('authors')
export class AuthorController {
    constructor(private authorService: AuthorService, private bookService: BookService) {}

    @Get('count')
    public async count(): Promise<ResponseMessage> {
        return {
            code: 'SUCCEEDED',
            action: 'COUNT_AUTHOR',
            data: await this.authorService.count(),
        };
    }

    @Get(':page/:limit')
    public async getAuthors(@Param() { page, limit }: PaginationParams): Promise<ResponseMessage> {
        const authors = await this.authorService.findAuthors(page, limit);
        const total = await this.authorService.count();
        return {
            code: 'SUCCEEDED',
            action: 'GET_AUTHORS',
            data: {
                authors,
                total,
            },
        };
    }

    @Get(':id')
    public async findById(@Param() { id }: FindOneParams): Promise<ResponseMessage> {
        const author = await this.authorService.findById(id);

        if (author) {
            return {
                code: 'SUCCEEDED',
                action: 'GET_AUTHOR',
                data: author,
            };
        }

        return {
            code: 'NOT_FOUND',
            action: 'GET_AUTHOR',
        };
    }

    @Get(':id/books/:page/:limit')
    public async findBooksByAuthorId(@Param() { id, page, limit }: FindBookByObjectIdParams): Promise<ResponseMessage> {
        const [books, total] = await this.bookService.findBooksByAuthorId(id, page, limit);
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
