import { IsNumberString, IsString } from 'class-validator';

export class SearchBookParams {
    @IsString()
    term: string;
}
