import { useContext, useEffect } from 'react';
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
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import SidebarActionBottom from './SidebarActionBottom';

export default function Sidebar() {
    // @ts-ignore
    const [isActiveSidebarMobile] = useContext(SidebarMobileContext);
    // @ts-ignore
    const { setNewChatMode, setActiveChatConversation, setClearActiveChat } =
        useContext(ChatContentContext);
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
        colorScheme: 'green',
        w: 'full',
    };

    if (!isActiveSidebarMobile && !isDekstopView) {
        sidebarBoxProps.display = 'none';
        sideBarTransitionsProps.style = { display: 'none' };
    }

    if (isDekstopView) {
        sideBarTransitionsProps.style = { display: 'none' };
    }

    const activateMessageTextArea = () => {
        setNewChatMode();
        setActiveChatConversation([]);
        setClearActiveChat();
        const textArea = document.querySelector<HTMLTextAreaElement>(
            '#chatMessageTextArea'
        )!;
        textArea.focus();
    };

    useEffect(() => {
        // @ts-ignore
        document.querySelector('#chatMessageTextArea').value = '';
    });

    const SidebarContent = () => (
        <Flex {...sidebarFlexProps}>
            <Box {...sidebarActionTopProps}>
                <HStack>
                    <Button
                        id="newChatButton"
                        onClick={activateMessageTextArea}
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
