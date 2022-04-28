import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity({
    name: 'data'
})
export class File {
    @PrimaryColumn()
    id: number;

    @Column()
    format: string;

    @Column({name:'uncompressed_size'})
    size: number;

    @Column()
    name: string

    @ManyToOne(() => Book, book => book.files)
    @JoinColumn({
       name: 'book'
    })
    book: Book;
}
