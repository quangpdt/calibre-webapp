import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TagController } from './tag.controller';
import { TagService } from '../database/services/tag.service';
import { BookService } from '../database/services/book.service';

@Module({
    imports: [DatabaseModule],
    controllers: [TagController],
    providers: [TagService, BookService],
})
export class TagModule {}
