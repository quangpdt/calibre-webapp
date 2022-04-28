import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '@calibre-webapp/datatype';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    async count(): Promise<number> {
        return this.tagRepository.count();
    }

    async findById(id: number): Promise<Tag> {
        return this.tagRepository.findOne({
            id,
        });
    }

    async findTags(): Promise<Tag[]> {
        return this.tagRepository.find();
    }
}
