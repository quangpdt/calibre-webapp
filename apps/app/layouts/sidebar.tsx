import { Avatar, Box, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Text, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaBeer, FaHome, FaPaw, FaTags, FaUsers } from 'react-icons/fa';
import { IconType } from 'react-icons';
import NextLink from 'next/link';

interface NavItem {
    name: string;
    icon: IconType;
    href: string;
}

const navItems: NavItem[] = [
    {
        name: 'Home',
        icon: FaHome,
        href: '/',
    },
    {
        name: 'Authors',
        icon: FaUsers,
        href: '/authors',
    },
    {
        name: 'Publishers',
        icon: FaPaw,
        href: '/publishers',
    },
    {
        name: 'Tags',
        icon: FaTags,
        href: '/tags',
    },
];

export const Swibc = ({ children }: { children: ReactNode }) => {
    const sidebar = useDisclosure();
    const integrations = useDisclosure();
    const color = 'gray.600';

    const NavItem = (props) => {
        const { icon, children, ...rest } = props;
        return (
            <Flex
                align="center"
                px="4"
                pl="4"
                py="5"
                cursor="pointer"
                color="inherit"
                _hover={{
                    bg: 'gray.100',
                    color: 'gray.900',
                }}
                role="group"
                fontWeight="semibold"
                transition=".15s ease"
                {...rest}
            >
                {icon && (
                    <Icon
                        mx="2"
                        boxSize="4"
                        _groupHover={{
                            color: color,
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        );
    };

    const SidebarContent = (props) => (
        <Box as="nav" pos="fixed" top="0" left="0" zIndex="sticky" h="full" pb="10" overflowX="hidden" overflowY="auto" bg="white" borderColor="inherit" borderRightWidth="1px" w="60" {...props}>
            <Flex px="4" py="5" align="center">
                <Text fontSize="2xl" ml="2" color="brand.500" fontWeight="semibold">
                    Choc UI
                </Text>
            </Flex>
            <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
                {navItems.map((item, index) => (
                    <NextLink key={index} passHref href={item.href}>
                        <a>
                            <NavItem icon={item.icon}>{item.name}</NavItem>
                        </a>
                    </NextLink>
                ))}
            </Flex>
        </Box>
    );
    return (
        <Box as="section" bg="gray.50" minH="100vh">
            <SidebarContent display={{ base: 'none', md: 'unset' }} />
            <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                <Flex as="header" align="center" justify="space-between" w="full" px="4" bg="white" borderBottomWidth="1px" borderColor="inherit" h="14">
                    <IconButton aria-label="Menu" display={{ base: 'inline-flex', md: 'none' }} onClick={sidebar.onOpen} icon={<FaBeer />} size="sm" />
                    <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
                        <InputLeftElement color="gray.500">
                            <FaBeer />
                        </InputLeftElement>
                        <Input placeholder="Search for articles..." />
                    </InputGroup>

                    <Flex align="center">
                        <Icon color="gray.500" as={FaBeer} cursor="pointer" />
                        <Avatar ml="4" size="sm" name="anubra266" src="https://avatars.githubusercontent.com/u/30869823?v=4" cursor="pointer" />
                    </Flex>
                </Flex>

                <Box as="main" p="4">
                    {/* Add content here, remove div below  */}
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
