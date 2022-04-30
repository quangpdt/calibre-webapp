import { GetServerSideProps, NextPage } from 'next';
import { apiUrl } from '../../constants';
import { Book } from '@calibre-webapp/datatype';
import { useRouter } from 'next/router';
import { BookGrid } from '../../components/book-grid';
import { Pagination } from '../../components/pagination';
import { isPositiveInt } from '@calibre-webapp/validators';
import { createApi } from '../../services/api-client';

interface Props {
    bookData: {
        books: Book[];
        total: number;
    };
    page: number;
    tagId: number;
}

const BooksByTags: NextPage<Props> = ({ bookData, page, tagId }) => {
    const router = useRouter();

    const handleGoNext = () => {
        router.push({
            href: router.basePath,
            query: {
                tagId,
                page: page + 1,
            },
        });
    };

    const handleGoPrev = () => {
        router.push({
            pathname: router.basePath,
            query: {
                tagId,
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

export const loadBooksByTag = async (tagId: number, page: number) => {
    const { data } = await createApi().get.bookListByTag(tagId, page);
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
    const tagId = parseInt(id as string, 10);

    const bookData = await loadBooksByTag(tagId, page);

    return {
        props: { bookData, page, tagId },
    };
};

export default BooksByTags;
