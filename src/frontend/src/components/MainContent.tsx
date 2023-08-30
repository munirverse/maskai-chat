import { useContext, useRef } from 'react';
import {
    Box,
    Flex,
    InputGroup,
    InputRightElement,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import { ChatLoadingState, ChatTitleItem } from '../Interfaces';
import { MessageTextArea } from './MessageTextArea';
import { MainContentDefault } from './MainContentDefault';
import { MainContentSkeleton } from './MainContentSkeleton';

export default function MainContent() {
    // Sidebar Mobile Context
    // @ts-ignore
    const [isActiveSidebarMobile] = useContext(SidebarMobileContext);

    // Chat Context
    // @ts-ignore
    const {
        // @ts-ignore
        chatKey,
        // @ts-ignore
        chatLoadingState,
        // @ts-ignore
        chatTitleList,
        // @ts-ignore
        updateChatTitleList,
        // @ts-ignore
        updateChatLoadingState,
    } = useContext(ChatContentContext);

    const textAreaRef = useRef();

    const submitMessage = (message?: string) => {
        if (!message) {
            const messageElement = document.querySelector<HTMLTextAreaElement>(
                '#chatMessageTextArea'
            )!;
            message = messageElement.value;
            if (!message.trim()) return;
            // @ts-ignore
            textAreaRef.current.clearTextArea();
        }

        if (!chatKey && chatLoadingState === ChatLoadingState.NOT_INIT) {
            const uniqueId = new Date().getTime().toString(32);
            updateChatTitleList(
                chatTitleList
                    .map((item: ChatTitleItem) => ({ ...item, isActive: null }))
                    .concat([
                        {
                            id: uniqueId,
                            title: message?.slice(0, 50),
                            isActive: 1,
                        },
                    ]),
                uniqueId
            );
            updateChatLoadingState(ChatLoadingState.LOADING);
        }
        console.log(message);
    };

    const mainContentDisplay = {
        [ChatLoadingState.NOT_INIT]: () => <MainContentDefault />,
        [ChatLoadingState.LOADING]: () => <MainContentSkeleton />,
        [ChatLoadingState.ACTIVE]: () => <MainContent />,
    };

    // @ts-ignore
    const MainContentDisplayRender =
        // @ts-ignore
        mainContentDisplay[chatLoadingState];

    return (
        <Box
            h={'full'}
            flexGrow={1}
            bg={useColorModeValue('gray.200', 'gray.700')}
            style={{ display: isActiveSidebarMobile ? 'none' : undefined }}
        >
            <Flex flexDirection={'column'} h={'full'} position={'relative'}>
                <Box flexGrow={'1'}>
                    <Box
                        m={'0 auto'}
                        w={'full'}
                        p={'2rem'}
                        maxH={'calc(100vh - 64px - 100px)'}
                        overflow={'scroll'}
                    >
                        <MainContentDisplayRender></MainContentDisplayRender>
                    </Box>
                </Box>
                <Box
                    minH={'120px'}
                    w={'full'}
                    p={'2rem'}
                    bgGradient={useColorModeValue(
                        'linear(to-b, transparent, gray.200, gray.300, gray.400)',
                        'linear(to-b, transparent, gray.700, gray.800, gray.900)'
                    )}
                    position={'absolute'}
                    bottom={0}
                >
                    <InputGroup>
                        <MessageTextArea
                            ref={textAreaRef}
                            onSubmit={submitMessage}
                        ></MessageTextArea>
                        <InputRightElement>
                            <Button
                                mr={'1rem'}
                                mt={'1rem'}
                                colorScheme={'green'}
                                onClick={() => submitMessage()}
                                isLoading={
                                    chatLoadingState ===
                                    ChatLoadingState.LOADING
                                        ? true
                                        : undefined
                                }
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
