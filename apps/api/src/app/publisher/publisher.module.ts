import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PublisherController } from './publisher.controller';
import { BookService } from '../database/services/book.service';
import { PublisherService } from '../database/services/publisher.service';

@Module({
    imports: [DatabaseModule],
    controllers: [PublisherController],
    providers: [PublisherService, BookService],
})
export class PublisherModule {}
