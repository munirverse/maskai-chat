import React, { useContext } from 'react';
import {
    Box,
    BoxProps,
    Flex,
    FlexProps,
    Button,
    ButtonProps,
    Text,
    TextProps,
    HStack,
    IconProps,
    useColorModeValue,
    useColorMode,
    ColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import MaskaiChatIcon from './MaskaiChatIcon';
import { SidebarMobileContext } from '../Contexts';

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    // @ts-ignore
    const [isActiveSidebarMobile, setActiveSidebarMobile] =
        useContext(SidebarMobileContext);

    const navbarBoxProps: BoxProps = {
        bg: useColorModeValue('gray.100', 'gray.900'),
        px: 4,
    };
    const navbarFlexProps: FlexProps = {
        h: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    };
    const navbarTextTitleProps: TextProps = {
        fontSize: 'lg',
        fontWeight: 'extrablold',
    };
    const navbarMenuButtonProps: ButtonProps = {
        display: {
            md: 'none',
        },
    };
    const navbarIconProps: IconProps = {
        fontSize: '2xl',
    };
    const toggleColorModeIcon = (colorMode: ColorMode) =>
        colorMode === 'light' ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>;
    const toggleSidebarMobile = () =>
        setActiveSidebarMobile(!isActiveSidebarMobile);

    return (
        <Box {...navbarBoxProps}>
            <Flex {...navbarFlexProps}>
                <HStack>
                    <Button
                        onClick={toggleSidebarMobile}
                        {...navbarMenuButtonProps}
                    >
                        <HamburgerIcon></HamburgerIcon>
                    </Button>
                    <MaskaiChatIcon {...navbarIconProps} />
                    <Text {...navbarTextTitleProps}>Mask AI Chat</Text>
                </HStack>

                <Button onClick={toggleColorMode}>
                    {toggleColorModeIcon(colorMode)}
                </Button>
            </Flex>
        </Box>
    );
}
