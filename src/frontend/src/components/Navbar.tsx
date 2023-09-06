import { useContext } from 'react';
import {
    Box,
    Flex,
    Button,
    Text,
    HStack,
    useColorModeValue,
    useColorMode,
    ColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import MaskaiChatIcon from './MaskaiChatIcon';
import { SidebarMobileContext } from '../Contexts';

export default function Navbar() {
    // @ts-ignore
    const [isActiveSidebarMobile, setActiveSidebarMobile] =
        useContext(SidebarMobileContext);

    const { colorMode, toggleColorMode } = useColorMode();

    const toggleColorModeIcon = (colorMode: ColorMode) =>
        colorMode === 'light' ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>;
    const toggleSidebarMobile = () =>
        setActiveSidebarMobile(!isActiveSidebarMobile);

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack>
                    <Button
                        display={{ md: 'none' }}
                        onClick={toggleSidebarMobile}
                    >
                        <HamburgerIcon></HamburgerIcon>
                    </Button>
                    <MaskaiChatIcon fontSize={'2xl'} />
                    <Text fontSize={'lg'} fontWeight={'extrabold'}>
                        Mask AI Chat
                    </Text>
                </HStack>

                <Button onClick={toggleColorMode}>
                    {toggleColorModeIcon(colorMode)}
                </Button>
            </Flex>
        </Box>
    );
}
