import { Button, Flex } from '@chakra-ui/react';
import { FC, MouseEventHandler } from 'react';

interface Props {
    currentPage: number;
    total: number;
    onNext: MouseEventHandler;
    onPrev: MouseEventHandler;
    pageLimit?: number;
}

interface PageButtonProps {
    disabled?: boolean;
    active?: boolean;
    children?: React.ReactNode;
    onClick: MouseEventHandler;
}

const PageButton: FC<PageButtonProps> = ({ disabled, active, children, onClick }) => {
    const activeStyle = {
        bg: 'brand.600',
        color: 'white',
    };

    return (
        <Button
            mx={1}
            px={4}
            py={2}
            rounded="md"
            bg="violet.600"
            color="gray.700"
            boxShadow="md"
            disabled={disabled}
            opacity={disabled && 0.6}
            _hover={!disabled && activeStyle}
            cursor={disabled && 'not-allowed'}
            {...(active && activeStyle)}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export const Pagination: FC<Props> = ({ currentPage, total, pageLimit = 20, onNext, onPrev }) => {
    const totalPage = Math.ceil(total / pageLimit);
    return (
        <Flex bg="#F9FAFB" p={50} w="full" alignItems="center" justifyContent="center">
            <Flex>
                <PageButton disabled={currentPage === 1} onClick={onPrev}>
                    previous
                </PageButton>
                <PageButton disabled={currentPage === totalPage} onClick={onNext}>
                    next
                </PageButton>
            </Flex>
        </Flex>
    );
};
