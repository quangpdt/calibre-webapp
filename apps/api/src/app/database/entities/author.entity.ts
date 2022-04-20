import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity({
    name: 'authors',
})
export class Author {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    link: string;

    @ManyToMany(() => Book, (book) => book.authors)
    @JoinTable({
        name: 'books_authors_link',
        joinColumn: {
            name: 'author',
        },
        inverseJoinColumn: {
            name: 'book',
        },
    })
    books: Book[];
}
