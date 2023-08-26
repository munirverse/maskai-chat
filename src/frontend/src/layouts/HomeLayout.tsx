import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import {
    DefaultProps,
    ChatContent,
    ChatLoadingState,
    ChatTitleItem,
    ChatConfiguration,
} from '../Interfaces';

export default function HomeLayout({ children }: DefaultProps) {
    // Chat Context
    const storedChatTitleList = localStorage.getItem('chatTitleList');
    const storedApiKey = localStorage.getItem('apiKey');

    const [chatTitleList, setChaTitleList] = useState<
        ChatContent['chatTitleList']
    >(storedChatTitleList ? JSON.parse(storedChatTitleList) : []);

    const [chatConversation, setChatConversation] = useState<
        ChatContent['chatActiveConversation']
    >([]);

    const [chatKey, setChatKey] = useState<ChatContent['chatActiveKey']>('');

    const [chatLoadingState, setChatLoadingState] = useState<
        ChatContent['chatLoadingState']
    >(ChatLoadingState.NOT_INIT);

    const [apiKey, setApiKey] = useState<ChatConfiguration['apiKey']>(
        storedApiKey || ''
    );

    const chatContentContextValue = {
        chatTitleList,
        updateChatTitleList: (chatTitleListData: ChatTitleItem[]) => {
            setChaTitleList(chatTitleListData);
            localStorage.setItem(
                'chatTitleList',
                JSON.stringify(chatTitleListData)
            );
        },
        chatConversation,
        updateChatConversation: (chatConversationData: unknown[]) => {
            setChatConversation(chatConversationData);
        },
        chatKey,
        updateChatKey: setChatKey,
        chatLoadingState,
        updateChatLoadingState: setChatLoadingState,
        apiKey,
        setApiKey: (apiKeyData: string) => {
            setApiKey(apiKeyData);
            localStorage.setItem('apiKey', apiKeyData);
        },
    };

    // Sidebar Mobile Context
    const [isActiveSidebarMobile, setActiveSidebarMobile] =
        useState<boolean>(false);

    const sidebarMobileContextValue = [
        isActiveSidebarMobile,
        setActiveSidebarMobile,
    ];

    return (
        <ChatContentContext.Provider value={chatContentContextValue}>
            <SidebarMobileContext.Provider value={sidebarMobileContextValue}>
                <Box h={'100vh'}>
                    <Flex flexDirection={'column'} h={'full'}>
                        {children}
                    </Flex>
                </Box>
            </SidebarMobileContext.Provider>
        </ChatContentContext.Provider>
    );
}
