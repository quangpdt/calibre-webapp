import { IsIn, IsNumberString, IsString } from 'class-validator';

export class DownloadBookParams {
    @IsNumberString()
    id: number;

    @IsString()
    @IsIn(['epub', 'mobi', 'azw3'])
    type: string;
}
