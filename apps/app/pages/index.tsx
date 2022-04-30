import { NextPage } from 'next';
import { apiUrl } from '../constants';
import { Book } from '@calibre-webapp/datatype';
import { BookGrid } from '../components/book-grid';
import { Pagination } from '../components/pagination';
import { useRouter } from 'next/router';
import { isPositiveInt } from '@calibre-webapp/validators';
import { apiClient, createApi } from '../services/api-client';

interface Props {
    statistics: {
        authorCount: number;
        tagCount: number;
    };
    bookData: {
        books: Book[];
        total: number;
    };
    page: number;
}

const Index: NextPage<Props> = ({ statistics, bookData, page }) => {
    const router = useRouter();
    const handleGoNext = () => {
        router.push({
            href: router.pathname,
            query: {
                page: page + 1,
            },
        });
    };

    const handleGoPrev = () => {
        router.push({
            pathname: router.pathname,
            query: {
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

export const loadLibraryStatistics = async () => {
    const { data } = await createApi().get.libraryStatistics();
    return data.data;
};

export const loadLatestBooks = async (pageNumber: number) => {
    const { data } = await createApi().get.booksList(pageNumber);
    return data.data;
};

export const getServerSideProps = async ({ query }) => {
    const { page } = query;
    const initialPage = isPositiveInt(page) ? parseInt(page, 10) : 1;

    const statistics = await loadLibraryStatistics();
    const bookData = await loadLatestBooks(initialPage);

    return {
        props: { statistics, bookData, page: initialPage },
    };
};

export default Index;
