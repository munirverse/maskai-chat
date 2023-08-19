import { useContext } from 'react';
import {
    Box,
    BoxProps,
    Flex,
    FlexProps,
    InputGroup,
    InputRightElement,
    Button,
    ButtonProps,
    useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { MessageTextArea } from './MessageTextArea';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import { MainContentDefault } from './MainContentDefault';
import { MainContentSkeleton } from './MainContentSkeleton';
import { ChatActiveLoadingState } from '../Interfaces';

export default function MainContent() {
    // @ts-ignore
    const [isActiveSidebarMobile] = useContext(SidebarMobileContext);
    // @ts-ignore
    const { chatContent, setActiveTitleChatList } =
        useContext(ChatContentContext);

    const mainContentBoxProps: BoxProps = {
        h: 'full',
        flexGrow: 1,
        bg: useColorModeValue('gray.200', 'gray.700'),
    };
    const mainContentFlexProps: FlexProps = {
        flexDirection: 'column',
        h: 'full',
    };
    const mainContentWrapperProps: BoxProps = {
        m: '0 auto',
        w: 'full',
        p: '2rem',
        maxH: 'calc(100vh - 120px - 64px)',
        overflow: 'scroll',
    };
    const mainContentChatInputProps: BoxProps = {
        minH: '120px',
        w: 'full',
        p: '2rem',
        bgGradient: useColorModeValue(
            'linear(to-b, transparent, gray.200, gray.300, gray.400)',
            'linear(to-b, transparent, gray.700, gray.800, gray.900)'
        ),
    };
    const mainContentSendButtonProps: ButtonProps = {
        mr: '1rem',
        mt: '1rem',
        colorScheme: 'green',
    };

    if (isActiveSidebarMobile) {
        mainContentBoxProps.display = 'none';
    }

    const mainContentDisplay = {
        [ChatActiveLoadingState.NOT_INIT]: () => <MainContentDefault />,
        [ChatActiveLoadingState.LOADING]: () => <MainContentSkeleton />,
        [ChatActiveLoadingState.ACTIVE]: () => <MainContent />,
    };

    // @ts-ignore
    const MainContentDisplayRender =
        // @ts-ignore
        mainContentDisplay[chatContent.activeChatState];

    const submitMessage = (message?: string | undefined) => {
        if (
            !chatContent.activeChatKeyId &&
            chatContent.activeChatState === ChatActiveLoadingState.NOT_INIT
        ) {
            const uniqueId = new Date().getTime().toString(32);
            setActiveTitleChatList(
                chatContent.titleChatlist.concat([
                    {
                        id: uniqueId,
                        title: message?.slice(0, 50),
                        isActive: 1,
                    },
                ]),
                uniqueId
            );
        }
        console.log(message);
    };

    return (
        <Box {...mainContentBoxProps}>
            <Flex {...mainContentFlexProps}>
                <Box flexGrow={'1'}>
                    <Box {...mainContentWrapperProps}>
                        <MainContentDisplayRender></MainContentDisplayRender>
                    </Box>
                </Box>
                <Box {...mainContentChatInputProps}>
                    <InputGroup>
                        <MessageTextArea
                            onSubmit={submitMessage}
                        ></MessageTextArea>
                        <InputRightElement>
                            <Button
                                {...mainContentSendButtonProps}
                                onClick={() => submitMessage()}
                            >
                                <ArrowForwardIcon></ArrowForwardIcon>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Flex>
        </Box>
    );
}
