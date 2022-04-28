import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from '../database/services/book.service';
import { FindOneParams } from '../shared/validators/find-one-params.validator';
import { ResponseMessage } from '@calibre-webapp/datatype';
import { PaginationParams } from '../shared/validators/pagination-params.validator';
import * as sanitizeHtml from 'sanitize-html';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get(':page/:limit')
    public async getBooks(@Param() { page, limit }: PaginationParams): Promise<ResponseMessage> {
        const books = await this.bookService.findBooks(page, limit);
        const total = await this.bookService.count();
        return {
            code: 'SUCCEEDED',
            action: 'GET_BOOKS',
            data: {
                books,
                total,
            },
        };
    }

    @Get(':id')
    public async findById(@Param() param: FindOneParams): Promise<ResponseMessage> {
        const book = await this.bookService.findById(param.id);
        if (book) {
            book.comment.text = sanitizeHtml(book.comment.text);
            return {
                code: 'SUCCEEDED',
                action: 'GET_BOOK',
                data: book,
            };
        }

        return {
            code: 'NOT_FOUND',
            action: 'GET_BOOK',
        };
    }
}
