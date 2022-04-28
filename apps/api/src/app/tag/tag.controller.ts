import { Controller, Get } from '@nestjs/common';
import { ResponseMessage } from '@calibre-webapp/datatype';
import { TagService } from '../database/services/tag.service';

@Controller('tags')
export class TagController {
    constructor(private tagService: TagService) {}

    @Get('count')
    public async count(): Promise<ResponseMessage> {
        return {
            code: 'SUCCEEDED',
            action: 'COUNT_TAG',
            data: await this.tagService.count(),
        };
    }
}
