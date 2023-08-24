import { useContext } from 'react';
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
import { ChatLoadingState } from '../Interfaces';
import { MessageTextArea } from './MessageTextArea';
import { MainContentDefault } from './MainContentDefault';
import { MainContentSkeleton } from './MainContentSkeleton';

export default function MainContent() {
    // Sidebar Mobile Context
    // @ts-ignore
    const [isActiveSidebarMobile] = useContext(SidebarMobileContext);

    // Chat Context
    // @ts-ignore
    const { chatKey, chatLoadingState, chatTitleList, updateChatTitleList } =
        useContext(ChatContentContext);

    const submitMessage = (message: string) => {
        if (!chatKey && chatLoadingState === ChatLoadingState.NOT_INIT) {
            const uniqueId = new Date().getTime().toString(32);
            updateChatTitleList(
                chatTitleList.concat([
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
            <Flex flexDirection={'column'} h={'full'}>
                <Box flexGrow={'1'}>
                    <Box
                        m={'0 auto'}
                        w={'full'}
                        p={'2rem'}
                        maxH={'calc(100vh - 120px - 64px)'}
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
                >
                    <InputGroup>
                        <MessageTextArea
                            onSubmit={submitMessage}
                        ></MessageTextArea>
                        <InputRightElement>
                            <Button
                                mr={'1rem'}
                                mt={'1rem'}
                                colorScheme={'green'}
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
