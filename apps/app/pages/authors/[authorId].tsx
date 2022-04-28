import { GetServerSideProps, NextPage } from 'next';
import { apiUrl } from '../../constants';
import { Book } from '@calibre-webapp/datatype';
import { useRouter } from 'next/router';
import { BookGrid } from '../../components/book-grid';
import { Pagination } from '../../components/pagination';
import { isPositiveInt } from '@calibre-webapp/validators';

interface Props {
    bookData: {
        books: Book[];
        total: number;
    };
    page: number;
    authorId: number;
}

const BooksByAuthor: NextPage<Props> = ({ bookData, page, authorId }) => {
    const router = useRouter();
    console.log(router);
    const handleGoNext = () => {
        router.push({
            href: router.basePath,
            query: {
                authorId,
                page: page + 1,
            },
        });
    };

    const handleGoPrev = () => {
        router.push({
            pathname: router.basePath,
            query: {
                authorId,
                page: page - 1,
            },
        });
    };

    return (
        <>
            <BookGrid books={bookData.books} />
            <Pagination currentPage={page} total={bookData.total} onNext={handleGoNext} onPrev={handleGoPrev} />
        </>
    );
};

export const loadBooksByAuthor = async (authorId: number, page: number) => {
    const response = await fetch(`${apiUrl}/authors/${authorId}/books/${page}/20`);
    const data = await response.json();
    return data.data;
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
    const { authorId } = params;
    const page = isPositiveInt(query.page as string) ? parseInt(query.page as string, 10) : 1;

    if (!isPositiveInt(authorId as string)) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }
    const authorIdInt = parseInt(authorId as string, 10);

    const bookData = await loadBooksByAuthor(authorIdInt, page);

    return {
        props: { bookData, page, authorId: authorIdInt },
    };
};

export default BooksByAuthor;
