import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from '../database/services/author.service';
import { ResponseMessage } from '@calibre-webapp/datatype';
import { FindOneParams } from '../shared/validators/find-one-params.validatior';

@Controller('authors')
export class AuthorController {
    constructor(private authorService: AuthorService) {}

    @Get('count')
    public async count(): Promise<ResponseMessage> {
        return {
            code: 'SUCCEEDED',
            action: 'COUNT_AUTHOR',
            data: await this.authorService.count(),
        };
    }

    @Get(':id')
    public async findById(@Param() { id }: FindOneParams): Promise<ResponseMessage> {
        const author = await this.authorService.findById(id);

        if (author) {
            return {
                code: 'SUCCEEDED',
                action: 'GET_AUTHOR',
                data: author,
            };
        }

        return {
            code: 'NOT_FOUND',
            action: 'GET_AUTHOR',
        };
    }
}
