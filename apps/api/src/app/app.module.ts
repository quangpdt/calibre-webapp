import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { Book } from '../../../../libs/datatype/src/entity/book.entity';
import { AuthorModule } from './author/author.module';
import { TagModule } from './tag/tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ResourceModule } from './resource/resouce.module';
import { LibraryModule } from './library/library.module';
import { PublisherModule } from './publisher/publisher.module';

@Module({
    imports: [
        // Global module
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: process.env.SQL_URL,
            entities: [Book],
            synchronize: false,
            autoLoadEntities: true,
            logging: true
        }),
        ServeStaticModule.forRoot({
            rootPath: process.env.CALIBRE_ROOT_PATH,
            serveRoot: 'resource',
        }),

        // Feature modules
        BookModule,
        AuthorModule,
        TagModule,
        ResourceModule,
        LibraryModule,
        PublisherModule
    ],
    // providers: [BookService],
})
export class AppModule {}
