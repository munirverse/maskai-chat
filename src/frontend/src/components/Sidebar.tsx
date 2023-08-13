import { useContext } from 'react';
import {
    Box,
    BoxProps,
    Flex,
    FlexProps,
    Button,
    ButtonProps,
    HStack,
    useColorModeValue,
    useMediaQuery,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { HTMLMotionProps, motion } from 'framer-motion';
import ChatTitleItems from './ChatTitleList';
import { SidebarMobileContext } from '../Contexts';
import SidebarActionBottom from './SidebarActionBottom';

export default function Sidebar() {
    // @ts-ignore
    const [isActiveSidebarMobile] = useContext(SidebarMobileContext);
    const [isDekstopView] = useMediaQuery('(min-width: 768px)');

    const sideBarTransitionsProps: HTMLMotionProps<'div'> = {
        className: 'sidebarMenuTransition',
    };
    const sidebarBoxProps: BoxProps = {
        bg: useColorModeValue('white', 'gray.800'),
        h: 'full',
        w: { base: 'full', md: '20rem' },
        maxW: { md: '20rem' },
    };
    const sidebarFlexProps: FlexProps = {
        flexDirection: 'column',
        h: 'full',
    };
    const sidebarActionTopProps: BoxProps = {
        p: '1rem',
    };
    const sidebarNewChatButtonProps: ButtonProps = {
        bg: useColorModeValue('green.400', 'green.700'),
        w: 'full',
    };

    if (!isActiveSidebarMobile && !isDekstopView) {
        sidebarBoxProps.display = 'none';
        sideBarTransitionsProps.style = { display: 'none' };
    }

    if (isDekstopView) {
        sideBarTransitionsProps.style = { display: 'none' };
    }

    const SidebarContent = () => (
        <Flex {...sidebarFlexProps}>
            <Box {...sidebarActionTopProps}>
                <HStack>
                    <Button
                        leftIcon={<PlusSquareIcon />}
                        {...sidebarNewChatButtonProps}
                    >
                        New Chat
                    </Button>
                </HStack>
            </Box>
            <ChatTitleItems></ChatTitleItems>
            <SidebarActionBottom></SidebarActionBottom>
        </Flex>
    );

    return isDekstopView ? (
        <Box {...sidebarBoxProps}>{SidebarContent()}</Box>
    ) : (
        <motion.div layout {...sideBarTransitionsProps}>
            <Box {...sidebarBoxProps}>{SidebarContent()}</Box>
        </motion.div>
    );
}
