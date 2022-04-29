import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from '@calibre-webapp/datatype';

@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(Publisher)
        private readonly publisherRepository: Repository<Publisher>
    ) {}

    async count(): Promise<number> {
        return this.publisherRepository.count();
    }

    async findById(id: number): Promise<Publisher> {
        return this.publisherRepository.findOne({
            id,
        });
    }

    async findPublishers(): Promise<Publisher[]> {
        return this.publisherRepository.find();
    }
}
