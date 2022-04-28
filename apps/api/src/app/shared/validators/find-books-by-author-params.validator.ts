import { IsNumberString } from 'class-validator';

export class FindBookByObjectIdParams {
    @IsNumberString()
    id: number;

    @IsNumberString()
    page: number;

    @IsNumberString()
    limit: number;
}
