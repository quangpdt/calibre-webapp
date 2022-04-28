import { Box, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { Book } from '@calibre-webapp/datatype';
import { FC } from 'react';
import NextLink from 'next/link';

interface Props {
    books: Book[];
}

export const BookGrid: FC<Props> = ({ books }) => {
    const renderBookView = (book) => (
        <NextLink passHref key={book.id} href={`/detail/${book.id}`}>
            <Box key={book.id} bg="white" shadow="md" rounded="md" css={{ cursor: 'pointer' }}>
                <Image w="full" fit="cover" src={`/api/resource/book/${book.id}/cover`} alt="avatar" />

                <Box p={2}>
                    <Link display="block" color="gray.800" fontWeight="bold">
                        {book.title}
                    </Link>
                    <Text mt={2} fontSize="sm" color="gray.700">
                        {book.authors.map((p) => p.name).join(', ')}
                    </Text>
                </Box>
            </Box>
        </NextLink>
    );
    return (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 5 }} spacing={5}>
            {books.map((book) => renderBookView(book))}
        </SimpleGrid>
    );
};
