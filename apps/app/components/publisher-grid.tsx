import { Publisher } from '@calibre-webapp/datatype';
import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, Image, Link, SimpleGrid } from '@chakra-ui/react';

interface Props {
    publishers: Publisher[];
}
export const PublisherGrid: FC<Props> = ({ publishers }) => {
    const renderPublisherView = (publisher: Publisher) => (
        <NextLink key={publisher.id} href={`/publishers/${publisher.id}`}>
            <Button colorScheme="purple" variant="ghost">
                {publisher.name}
            </Button>
        </NextLink>
    );
    return (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 5 }} spacing={5}>
            {publishers.map((publisher) => renderPublisherView(publisher))}
        </SimpleGrid>
    );
};
