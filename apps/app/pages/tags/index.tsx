import { apiUrl } from '../../constants';
import { Tag } from '@calibre-webapp/datatype';
import { NextPage } from 'next';
import { TagGrid } from '../../components/tag-grid';
import { Pagination } from '../../components/pagination';
import { useRouter } from 'next/router';

interface Props {
    tagData: {
        tags: Tag[];
        total: number;
    };
    page: number;
}

const Tags: NextPage<Props> = ({ tagData, page }) => {
    return (
        <>
            <TagGrid tags={tagData.tags} />
        </>
    );
};

export const loadTags = async (pageNumber: number) => {
    const response = await fetch(`${apiUrl}/tags`);
    const data = await response.json();
    return data.data;
};

export const getServerSideProps = async ({ query }) => {
    const { page } = query;
    const initialPage = page ? (isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10)) : 1;

    const tagData = await loadTags(initialPage);

    return {
        props: { tagData, page: initialPage },
    };
};

export default Tags;
