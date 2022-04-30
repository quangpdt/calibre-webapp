import { apiUrl } from '../../constants';
import { Tag } from '@calibre-webapp/datatype';
import { NextPage } from 'next';
import { TagGrid } from '../../components/tag-grid';
import { Pagination } from '../../components/pagination';
import { useRouter } from 'next/router';
import { createApi } from '../../services/api-client';

interface Props {
    tagData: {
        tags: Tag[];
        total: number;
    };
}

const Tags: NextPage<Props> = ({ tagData }) => {
    return (
        <>
            <TagGrid tags={tagData.tags} />
        </>
    );
};

export const loadTags = async () => {
    const { data } = await createApi().get.tagList();
    return data.data;
};

export const getServerSideProps = async ({ query }) => {
    const tagData = await loadTags();

    return {
        props: { tagData },
    };
};

export default Tags;
