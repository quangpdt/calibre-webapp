import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity({
    name: 'tags',
})
export class Tag {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Book, (book) => book.tags)
    @JoinTable({
        name: 'books_tags_link',
        joinColumn: {
            name: 'tag',
        },
        inverseJoinColumn: {
            name: 'book',
        },
    })
    books: Book[];
}
