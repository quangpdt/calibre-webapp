import { GetServerSideProps, NextPage } from 'next';
import { ReactNode } from 'react';
import { apiUrl } from '../../constants';
import { Book } from '@calibre-webapp/datatype';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { isPositiveInt } from '@calibre-webapp/validators';

interface Props {
    book: Book;
    children?: ReactNode;
}

const BookDetail: NextPage<Props> = ({ book }) => {
    return (
        <>
            <Flex>
                <Box w="xs" bg="white" shadow="lg" rounded="lg" overflow="hidden" mx="auto">
                    <Image w="full" fit="cover" src={`/api/resource/book/${book.id}/cover`} alt="avatar" />
                </Box>

                <Box flex={1} ml="10">
                    <Text fontSize="2xl" mb="5">
                        {book.title}
                    </Text>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: book.comment.text,
                        }}
                        style={{ marginBottom: '1.25rem', lineHeight: '2' }}
                    />
                    <Flex>
                        {book.files.map((file) => (
                            <NextLink key={file.id} href={`/api/resource/book/${book.id}/${file.format.toLowerCase()}`}>
                                <Button mr="3" colorScheme="teal">
                                    {file.format}
                                </Button>
                            </NextLink>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </>
    );
};

export const loadBookDetail = async (bookId: number) => {
    const response = await fetch(`${apiUrl}/books/${bookId}`);
    const data = await response.json();
    return data.data;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { bookId } = params;
    if (!isPositiveInt(bookId as string)) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }

    const book = await loadBookDetail(parseInt(bookId as string, 10));

    return {
        props: { book },
    };
};

export default BookDetail;
