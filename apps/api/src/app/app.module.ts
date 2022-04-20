import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { Book } from './database/entities/book.entity';

@Module({
    imports: [
        // Global module
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: '/Users/quangpham/Documents/calibre/test/metadata.db',
            entities: [Book],
            synchronize: false,
            autoLoadEntities: true,
            logging: true,
        }),

        // Feature modules
        BookModule,
    ],
    // providers: [BookService],
})
export class AppModule {}
