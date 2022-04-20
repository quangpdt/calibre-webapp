import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Author } from './author.entity';
import { Publisher } from './publisher.entity';
import { Tag } from './tag.entitiy';
import { Comment } from './comment.entity';

@Entity({
    name: 'books',
})
export class Book {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        name: 'last_modified',
    })
    lastModified: Date;

    @OneToOne(() => Comment, (comment) => comment.book)
    comment: Comment;

    @ManyToMany(() => Author, (author) => author.books)
    @JoinTable({
        name: 'books_authors_link',
        joinColumn: {
            name: 'book',
        },
        inverseJoinColumn: {
            name: 'author',
        },
    })
    authors: Author[];

    @ManyToMany(() => Publisher, (publisher) => publisher.books)
    @JoinTable({
        name: 'books_publishers_link',
        joinColumn: {
            name: 'book',
        },
        inverseJoinColumn: {
            name: 'publisher',
        },
    })
    publishers: Publisher[];

    @ManyToMany(() => Tag, (tag) => tag.books)
    @JoinTable({
        name: 'books_tags_link',
        joinColumn: {
            name: 'book',
        },
        inverseJoinColumn: {
            name: 'tag',
        },
    })
    tags: Tag[];
}
