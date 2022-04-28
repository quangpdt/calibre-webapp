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
            {/*<Box key={tag.id} bg="white" shadow="md" rounded="md" css={{ cursor: 'pointer' }}>*/}
            {/*    <Image*/}
            {/*        w="full"*/}
            {/*        h={56}*/}
            {/*        fit="cover"*/}
            {/*        src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"*/}
            {/*        alt="avatar"*/}
            {/*    />*/}

            {/*    <Box py={3}>*/}
            {/*        <Link display="block" fontSize="lg" color="gray.800" fontWeight="bold" ml="2">*/}
            {/*            {tag.name}*/}
            {/*        </Link>*/}
            {/*    </Box>*/}
            {/*</Box>*/}
        </NextLink>
    );
    return (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 5 }} spacing={5}>
            {tags.map((tag) => renderTagView(tag))}
        </SimpleGrid>
    );
};
