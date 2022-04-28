import { IsNumberString } from 'class-validator';

export class PaginationParams {
    @IsNumberString()
    page: number;

    @IsNumberString()
    limit: number;
}
