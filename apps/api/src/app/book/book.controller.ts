import { Controller, Get } from '@nestjs/common';
import { BookService } from '../database/services/book.service';
import { Book } from '../database/entities/book.entity';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }
}
