import { useEffect, useState } from 'react';
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
    const storedModelGPT = localStorage.getItem('modelGPT');

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

    const [modelGPT, setModelGPT] = useState<ChatConfiguration['model']>(
        storedModelGPT || ''
    );

    // Shared functions
    const getModelGPTList = async (apiKey: string) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${apiKey}`);

        return fetch(`${import.meta.env.FE_BASE_API_URL}/openai/models`, {
            headers,
        })
            .then((data) => data.json())
            .catch((error) => {
                console.error(error);
            });
    };

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
        updateApiKey: (apiKeyData: string) => {
            setApiKey(apiKeyData);
            localStorage.setItem('apiKey', apiKeyData);
        },
        modelGPT,
        updateModelGPT: (modelGPTData: string) => {
            setModelGPT(modelGPTData);
            localStorage.setItem('modelGPT', modelGPTData);
        },
        sharedFunctions: {
            getModelGPTList,
        },
    };

    // Sidebar Mobile Context
    const [isActiveSidebarMobile, setActiveSidebarMobile] =
        useState<boolean>(false);

    const sidebarMobileContextValue = [
        isActiveSidebarMobile,
        setActiveSidebarMobile,
    ];

    useEffect(() => {
        (async () => {
            if (!modelGPT && apiKey) {
                const rawModelGPTList = await getModelGPTList(apiKey);
                setModelGPT(rawModelGPTList?.data?.[0] || '');
            }
        })();
    }, [modelGPT, setModelGPT, apiKey]);

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
