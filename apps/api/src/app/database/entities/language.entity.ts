import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'languages',
})
export class Language {
    @PrimaryColumn()
    id: number;

    @Column({
        name: 'lang_code',
    })
    code: string;
}
