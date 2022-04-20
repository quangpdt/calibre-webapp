import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) {}

    async findAll(): Promise<Book[]> {
        return this.bookRepository.find({
            relations: ['comment'],
        });
    }

    async count(): Promise<number> {
        return this.bookRepository.count();
    }

    async findById(id: number): Promise<Book> {
        return this.bookRepository.findOne(
            {
                id,
            },
            {
                relations: ['comment'],
            }
        );
    }
}
