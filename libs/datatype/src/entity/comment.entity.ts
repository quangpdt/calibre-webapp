import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity({
    name: 'comments',
})
export class Comment {
    @PrimaryColumn()
    id: number;

    @Column()
    text: string;

    @OneToOne(() => Book)
    @JoinColumn({
        name: 'book',
    })
    book: Book;
}
