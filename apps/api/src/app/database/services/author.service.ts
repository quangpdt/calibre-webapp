import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '@calibre-webapp/datatype';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>
    ) {}

    async findAuthors(page: number, limit: number): Promise<Author[]> {
        return this.authorRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async count(): Promise<number> {
        return this.authorRepository.count();
    }

    async findById(id: number): Promise<Author> {
        return this.authorRepository.findOne({
            id,
        });
    }
}
