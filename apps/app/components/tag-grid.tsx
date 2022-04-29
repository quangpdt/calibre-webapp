import { Tag } from '@calibre-webapp/datatype';
import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, Image, Link, SimpleGrid } from '@chakra-ui/react';

interface Props {
    tags: Tag[];
}
export const TagGrid: FC<Props> = ({ tags }) => {
    const renderTagView = (tag: Tag) => (
        <NextLink key={tag.id} href={`/tags/${tag.id}`}>
            <Button colorScheme='teal' variant='ghost'>
                {tag.name}
            </Button>
        </NextLink>
    );
    return (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 5 }} spacing={5}>
            {tags.map((tag) => renderTagView(tag))}
        </SimpleGrid>
    );
};
