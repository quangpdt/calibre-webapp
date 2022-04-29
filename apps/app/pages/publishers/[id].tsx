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
    publisherId: number;
}

const BooksByPublishers: NextPage<Props> = ({ bookData, page, publisherId }) => {
    const router = useRouter();

    const handleGoNext = () => {
        router.push({
            href: router.basePath,
            query: {
                publisherId,
                page: page + 1,
            },
        });
    };

    const handleGoPrev = () => {
        router.push({
            pathname: router.basePath,
            query: {
                publisherId,
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

export const loadBooksByPublisher = async (publisherId: number, page: number) => {
    const response = await fetch(`${apiUrl}/publishers/${publisherId}/books/${page}/20`);
    const data = await response.json();
    return data.data;
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
    const { id } = params;
    const page = isPositiveInt(query.page as string) ? parseInt(query.page as string, 10) : 1;

    if (!isPositiveInt(id as string)) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }
    const publisherId = parseInt(id as string, 10);

    const bookData = await loadBooksByPublisher(publisherId, page);

    return {
        props: { bookData, page, publisherId },
    };
};

export default BooksByPublishers;
