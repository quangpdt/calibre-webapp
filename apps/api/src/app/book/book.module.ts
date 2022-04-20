import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from '../database/services/book.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule {}
