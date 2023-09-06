import { useContext, useRef, useEffect } from 'react';
import {
    Box,
    Flex,
    InputGroup,
    InputRightElement,
    Button,
    useColorModeValue,
    Alert,
    AlertDescription,
    HStack,
    Stack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { ArrowForwardIcon, LockIcon } from '@chakra-ui/icons';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import {
    ChatContentContextValues,
    ChatLoadingState,
    ChatTitleItem,
} from '../Interfaces';
import { MessageTextArea } from './MessageTextArea';
import { MainContentDefault } from './MainContentDefault';
import { MainContentMessage } from './MainContentMessage';

export default function MainContent() {
    // Sidebar Mobile Context
    // @ts-ignore
    const [isActiveSidebarMobile] = useContext(SidebarMobileContext);

    // Chat Context
    const { chat, config } = useContext(
        ChatContentContext
    ) as ChatContentContextValues;

    // Modal error submit
    const {
        isOpen: isOpenModalErrorSubmit,
        onOpen: onOpenModalErrorSubmit,
        onClose: onCloseModalErrorSubmit,
    } = useDisclosure();

    const textAreaRef = useRef();

    const submitMessage = (message?: string) => {
        if (!config.apiKey.get()) {
            onOpenModalErrorSubmit();
            return;
        }

        if (!message) {
            const messageElement = document.querySelector<HTMLTextAreaElement>(
                '#chatMessageTextArea'
            )!;
            message = messageElement.value;
            if (!message.trim()) return;
            // @ts-ignore
            textAreaRef.current.clearTextArea();
        }

        if (
            !chat.activeKey.get() &&
            chat.loadingState.get() === ChatLoadingState.NOT_INIT
        ) {
            const uniqueId = new Date().getTime().toString(32);
            chat.titleList.set(
                chat.titleList
                    .get()
                    .map(
                        (item): ChatTitleItem => ({
                            ...item,
                            isActive: undefined,
                        })
                    )
                    .concat([
                        {
                            id: uniqueId,
                            title: message?.slice(0, 50),
                            isActive: 1,
                        },
                    ])
            );
            chat.activeKey.set(uniqueId);
            chat.loadingState.set(ChatLoadingState.LOADING);
            chat.conversation.set(
                chat.conversation
                    .get()
                    .slice()
                    .concat([{ role: 'user', content: message }]),
                uniqueId,
                true
            );
        }

        if (
            chat.activeKey.get() &&
            chat.loadingState.get() === ChatLoadingState.ACTIVE
        ) {
            chat.conversation.set(
                chat.conversation
                    .get()
                    .slice()
                    .concat([{ role: 'user', content: message }]),
                chat.activeKey.get(),
                true
            );
            chat.loadingState.set(ChatLoadingState.LOADING);
        }
    };

    const mainContentDisplay = {
        [ChatLoadingState.NOT_INIT]: () => <MainContentDefault />,
        [ChatLoadingState.LOADING]: () => <MainContentMessage />,
        [ChatLoadingState.ACTIVE]: () => <MainContentMessage />,
        [ChatLoadingState.DISABLED]: () => <MainContentMessage />,
    };

    // @ts-ignore
    const MainContentDisplayRender =
        // @ts-ignore
        mainContentDisplay[chat.loadingState.get()];

    useEffect(() => {
        if (chat.loadingState.get() === ChatLoadingState.LOADING) {
            document.querySelector('#bottomAnswerChat')!.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
            });
        }
    }, [chat.loadingState]);

    return (
        <Box
            h={'full'}
            bg={useColorModeValue('gray.200', 'gray.700')}
            style={{ display: isActiveSidebarMobile ? 'none' : undefined }}
            w={'full'}
        >
            <Flex flexDirection={'column'} h={'full'} position={'relative'}>
                <Box>
                    <Box
                        m={'0 auto'}
                        w={'full'}
                        maxH={'calc(100vh - 64px - 100px)'}
                        overflow={'scroll'}
                    >
                        <MainContentDisplayRender></MainContentDisplayRender>
                    </Box>
                </Box>
                <Box
                    minH={'120px'}
                    w={'full'}
                    px={'2rem'}
                    pt={'2.5rem'}
                    bgGradient={useColorModeValue(
                        'linear(to-b, transparent, gray.200, gray.300, gray.400)',
                        'linear(to-b, transparent, gray.700, gray.800, gray.900)'
                    )}
                    position={'absolute'}
                    bottom={0}
                >
                    {chat.loadingState.get() === ChatLoadingState.DISABLED ? (
                        <Alert status="error" mt={'-2'}>
                            <Stack spacing={1}>
                                <HStack spacing={2}>
                                    <LockIcon></LockIcon>
                                    <Text fontWeight={'bold'}>
                                        This chat conversation was disabled,
                                        please start the new conversation.
                                    </Text>
                                </HStack>
                                <AlertDescription>
                                    This could be because an error occurred
                                    while calling the OpenAI API or your token
                                    has reached its limit.
                                </AlertDescription>
                            </Stack>
                        </Alert>
                    ) : (
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
                                        chat.loadingState.get() ===
                                        ChatLoadingState.LOADING
                                            ? true
                                            : undefined
                                    }
                                >
                                    <ArrowForwardIcon></ArrowForwardIcon>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    )}
                </Box>
            </Flex>
            <Modal
                isOpen={isOpenModalErrorSubmit}
                onClose={onCloseModalErrorSubmit}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Failed to Submit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        You need to store the Open API Key first before continue
                        to submit message, go to `Configuration` &gt; `API
                        Keys`.
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant={'ghost'}
                            onClick={onCloseModalErrorSubmit}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
