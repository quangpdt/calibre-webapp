import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BookService } from '../database/services/book.service';
import { ResourceController } from './resource.controller';
import { FileService } from '../database/services/file.service';

@Module({
    imports: [DatabaseModule],
    providers: [BookService, FileService],
    controllers: [ResourceController],
})
export class ResourceModule {}
