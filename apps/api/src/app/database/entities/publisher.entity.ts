import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity({
    name: 'publishers',
})
export class Publisher {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Book, (book) => book.publishers)
    @JoinTable({
        name: 'books_publishers_link',
        joinColumn: {
            name: 'publisher',
        },
        inverseJoinColumn: {
            name: 'book',
        },
    })
    books: Book[];
}
