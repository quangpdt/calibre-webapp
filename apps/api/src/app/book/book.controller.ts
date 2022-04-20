import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from '../database/services/book.service';
import { Book } from '../database/entities/book.entity';
import { FindOneParams } from '../shared/validators/find-one-params.validatior';
import { ResponseMessage } from '@calibre-webapp/datatype';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Get(':id')
    public async findById(@Param() param: FindOneParams): Promise<ResponseMessage> {
        const book = await this.bookService.findById(param.id);

        if (book) {
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
