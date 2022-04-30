import { Controller, Get, Param } from '@nestjs/common';
import { ResponseMessage } from '@calibre-webapp/datatype';
import { PublisherService } from '../database/services/publisher.service';
import { FindBookByObjectIdParams } from '../shared/validators/find-books-by-author-params.validator';
import { BookService } from '../database/services/book.service';

@Controller('publishers')
export class PublisherController {
    constructor(private publisherService: PublisherService, private bookService: BookService) {}

    @Get('count')
    public async count(): Promise<ResponseMessage> {
        return {
            code: 'SUCCEEDED',
            action: 'COUNT_TAG',
            data: await this.publisherService.count(),
        };
    }

    @Get('list')
    public async getPublishers(): Promise<ResponseMessage> {
        const publishers = await this.publisherService.findPublishers();
        return {
            code: 'SUCCEEDED',
            action: 'GET_AUTHORS',
            data: {
                publishers,
                total: publishers.length,
            },
        };
    }

    @Get(':id/books/:page/:limit')
    public async findBooksByAuthorId(@Param() { id, page, limit }: FindBookByObjectIdParams): Promise<ResponseMessage> {
        const [books, total] = await this.bookService.findBooksByPublisherId(id, page, limit);
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
