import { Book, Author, Publisher, Language, Tag, Comment, File } from '@calibre-webapp/datatype';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './services/book.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Book, Author, Publisher, Language, Tag, Comment, File])],
    providers: [BookService],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
