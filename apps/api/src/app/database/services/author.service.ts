import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>
    ) {}

    async count(): Promise<number> {
        return this.authorRepository.count();
    }

    async findById(id: number): Promise<Author> {
        return this.authorRepository.findOne({
            id,
        });
    }
}
