import { Controller, Get } from '@nestjs/common';
import { ResponseMessage } from '@calibre-webapp/datatype';
import { AuthorService } from '../database/services/author.service';
import { TagService } from '../database/services/tag.service';

@Controller('library')
export class LibraryController {
    constructor(private authorService: AuthorService, private tagService: TagService) {}
    @Get('statistics')
    public async getStatistics(): Promise<ResponseMessage> {
        const authorCount = await this.authorService.count();
        const tagCount = await this.tagService.count();

        return {
            code: 'SUCCEEDED',
            action: 'STATISTICS',
            data: {
                authorCount,
                tagCount,
            },
        };
    }
}
