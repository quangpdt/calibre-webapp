import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '@calibre-webapp/datatype';

export type FindFileWithCondition = {
    bookId: number;
    type: string;
};

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>
    ) {}

    public async getFileWithCondition(condition: FindFileWithCondition): Promise<File> {
        return this.fileRepository.findOne({
            where: {
                book: {
                    id: condition.bookId,
                    type: condition.type,
                },
            },
            relations: ['book'],
            select: ['id', 'name', 'book'],
        });
    }
}
