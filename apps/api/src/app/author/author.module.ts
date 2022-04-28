import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthorController } from './author.controller';
import { AuthorService } from '../database/services/author.service';
import { BookService } from '../database/services/book.service';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthorController],
    providers: [AuthorService, BookService],
})
export class AuthorModule {}
