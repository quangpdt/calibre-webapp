import { IsNumberString } from 'class-validator';

export class FindBooksByAuthorParams {
    @IsNumberString()
    authorId: number;

    @IsNumberString()
    page: number;

    @IsNumberString()
    limit: number;
}
