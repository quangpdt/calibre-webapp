import { apiUrl } from '../../constants';
import { Author } from '@calibre-webapp/datatype';
import { NextPage } from 'next';
import { AuthorGrid } from '../../components/author-grid';
import { Pagination } from '../../components/pagination';
import { useRouter } from 'next/router';
import { createApi } from '../../services/api-client';

interface Props {
    authorData: {
        authors: Author[];
        total: number;
    };
    page: number;
}

const Authors: NextPage<Props> = ({ authorData, page }) => {
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
            <AuthorGrid authors={authorData.authors} />
            <Pagination currentPage={page} total={authorData.total} onNext={handleGoNext} onPrev={handleGoPrev} />
        </>
    );
};

export const loadAuthors = async (pageNumber: number) => {
    const { data } = await createApi().get.authorList(pageNumber);
    return data.data;
};

export const getServerSideProps = async ({ query }) => {
    const { page } = query;
    const initialPage = page ? (isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10)) : 1;

    const authorData = await loadAuthors(initialPage);

    return {
        props: { authorData, page: initialPage },
    };
};

export default Authors;
