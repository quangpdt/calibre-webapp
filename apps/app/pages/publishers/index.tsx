import { apiUrl } from '../../constants';
import { Publisher } from '@calibre-webapp/datatype';
import { NextPage } from 'next';
import { PublisherGrid } from '../../components/publisher-grid';
import { createApi } from '../../services/api-client';

interface Props {
    publisherData: {
        publishers: Publisher[];
        total: number;
    };
    page: number;
}

const Publishers: NextPage<Props> = ({ publisherData, page }) => {
    return (
        <>
            <PublisherGrid publishers={publisherData.publishers} />
        </>
    );
};

export const loadPublishers = async (pageNumber: number) => {
    const { data } = await createApi().get.publisherList();
    return data.data;
};

export const getServerSideProps = async ({ query }) => {
    const { page } = query;
    const initialPage = page ? (isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10)) : 1;

    const publisherData = await loadPublishers(initialPage);

    return {
        props: { publisherData, page: initialPage },
    };
};

export default Publishers;
