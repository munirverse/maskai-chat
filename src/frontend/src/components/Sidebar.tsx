import { useContext } from 'react';
import {
    Box,
    BoxProps,
    Flex,
    FlexProps,
    Button,
    ButtonProps,
    Text,
    HStack,
    useColorModeValue,
    useMediaQuery,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { HTMLMotionProps, motion } from 'framer-motion';
import ChatTitleItems from './ChatTitleItems';
import { SidebarMobileContext } from '../Contexts';

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
    const sideBarActionBottomProps: BoxProps = {
        bg: useColorModeValue('gray.100', 'gray.900'),
    };

    if (!isActiveSidebarMobile && !isDekstopView) {
        sidebarBoxProps.display = 'none';
        sideBarTransitionsProps.style = { display: 'none' };
    }

    if (isDekstopView) {
        sideBarTransitionsProps.style = { display: 'none' };
    }

    const sideBarContent = () => (
        <Flex {...sidebarFlexProps}>
            <Box {...sidebarActionTopProps}>
                <Button {...sidebarNewChatButtonProps}>
                    <HStack>
                        <PlusSquareIcon></PlusSquareIcon>
                        <Text>New Chat</Text>
                    </HStack>
                </Button>
            </Box>
            <ChatTitleItems></ChatTitleItems>
            <Box {...sideBarActionBottomProps}>
                <Text>
                    {isActiveSidebarMobile ? 'Testing' : 'Not testing'}
                    {isDekstopView ? ' desktop' : ' mobile'}
                </Text>
            </Box>
        </Flex>
    );

    return isDekstopView ? (
        <Box {...sidebarBoxProps}>{sideBarContent()}</Box>
    ) : (
        <motion.div layout {...sideBarTransitionsProps}>
            <Box {...sidebarBoxProps}>{sideBarContent()}</Box>
        </motion.div>
    );
}
