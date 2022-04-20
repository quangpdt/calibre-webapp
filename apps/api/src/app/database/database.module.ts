import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './services/book.service';
import { Author } from './entities/author.entity';
import { Publisher } from './entities/publisher.entity';
import { Language } from './entities/language.entity';
import { Tag } from './entities/tag.entitiy';
import { Comment } from './entities/comment.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Book, Author, Publisher, Language, Tag, Comment])],
    providers: [BookService],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
