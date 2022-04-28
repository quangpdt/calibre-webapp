import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { FindOneParams } from '../shared/validators/find-one-params.validator';
import { BookService } from '../database/services/book.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { DownloadBookParams } from '../shared/validators/download-book-params.validator';
import { Response } from 'express';
import { FileService } from '../database/services/file.service';

@Controller('resource')
export class ResourceController {
    private readonly calibreRootPath = process.env.CALIBRE_ROOT_PATH;

    constructor(private bookService: BookService, private fileService: FileService) {}

    @Get('book/:id/cover')
    public async getBookCover(@Param() param: FindOneParams, @Res() res: Response): Promise<any> {
        const book = await this.bookService.findById(param.id);

        const file = createReadStream(join(this.calibreRootPath, book.path, 'cover.jpg'));
        file.pipe(res as never);
    }

    @Get('book/:id/:type')
    public async downloadBook(@Param() param: DownloadBookParams, @Res({ passthrough: true }) res: Response): Promise<any> {
        const bookFile = await this.fileService.getFileWithCondition({
            bookId: param.id,
            type: param.type,
        });

        const fileName = bookFile.name + '.' + param.type;

        const file = createReadStream(join(this.calibreRootPath, bookFile.book.path, fileName));
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        });

        return new StreamableFile(file);
    }
}
