import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author, Book } from '@calibre-webapp/datatype';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>
    ) {}

    async findBooks(page: number, limit: number): Promise<Book[]> {
        return this.bookRepository.find({
            relations: ['comment', 'authors'],
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async findBooksByAuthorId(authorId: number, page: number, limit: number): Promise<Book[]> {
        return this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.authors', 'authors')
            .where('authors.id IN (:...authorId)', { authorId: [authorId] })
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    }

    async countBooksByAuthorId(authorId: number): Promise<number> {
        return this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.authors', 'authors')
            .leftJoinAndSelect('book.tags', 'tags')
            .where('authors.id IN (:...authorId)', { authorId: [authorId] })
            .getCount();
    }

    async findBooksByTagId(tagId: number, page: number, limit: number): Promise<Book[]> {
        return this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.tags', 'tags')
            .leftJoinAndSelect('book.authors', 'authors')
            .where('tags.id IN (:...tagId)', { tagId: [tagId] })
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    }

    async countBooksByTagId(tagId: number): Promise<number> {
        return this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.tags', 'tags')
            .where('tags.id IN (:...tagId)', { tagId: [tagId] })
            .getCount();
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
                relations: ['comment', 'files'],
            }
        );
    }
}
