import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../../../../libs/datatype/src/entity/book.entity';
import { BookService } from './services/book.service';
import { Author } from '../../../../../libs/datatype/src/entity/author.entity';
import { Publisher } from '../../../../../libs/datatype/src/entity/publisher.entity';
import { Language } from '../../../../../libs/datatype/src/entity/language.entity';
import { Tag } from '../../../../../libs/datatype/src/entity/tag.entitiy';
import { Comment } from '../../../../../libs/datatype/src/entity/comment.entity';
import { File } from '../../../../../libs/datatype/src/entity/file.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Book, Author, Publisher, Language, Tag, Comment, File])],
    providers: [BookService],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
