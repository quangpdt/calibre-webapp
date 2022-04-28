import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthorService } from '../database/services/author.service';
import { TagService } from '../database/services/tag.service';
import { BookService } from '../database/services/book.service';
import { LibraryController } from './library.controller';

@Module({
    imports: [DatabaseModule],
    providers: [AuthorService, TagService, BookService],
    controllers: [LibraryController],
})
export class LibraryModule {}
