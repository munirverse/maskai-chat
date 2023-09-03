import { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import {
    DefaultProps,
    ChatContent,
    ChatLoadingState,
    ChatConfiguration,
    ModelGPTListItem,
    ChatContentContextValues,
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

    const [modelGPTList, setModelGPTList] = useState<
        ChatConfiguration['modelList']
    >([]);

    const [streamingAnswer, setStreamingAnswer] =
        useState<ChatContent['chatStreamingAnswer']>('');

    // async functions
    const getModelGPTList = (apiKey: string) => {
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

    const getStreamingAnswer = (
        apiKey: string,
        model: string,
        messages: ChatContent['chatActiveConversation']
    ) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${apiKey}`);

        const rawPayload = JSON.stringify({ model, messages });

        const requestOpts: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: rawPayload,
            redirect: 'follow',
        };

        return fetch(
            `${import.meta.env.FE_BASE_API_URL}/openai/answer`,
            requestOpts
        );
    };

    const chatContentContextValue: ChatContentContextValues = {
        chat: {
            titleList: {
                get: () => chatTitleList,
                set: (chatTitleListData: ChatContent['chatTitleList']) => {
                    setChaTitleList(chatTitleListData);
                    localStorage.setItem(
                        'chatTitleList',
                        JSON.stringify(chatTitleListData)
                    );
                },
            },
            conversation: {
                get: () => chatConversation,
                set: (
                    chatConversationData: ChatContent['chatActiveConversation'],
                    keyId?: string,
                    writeOnLocalStorage?: boolean
                ) => {
                    setChatConversation(chatConversationData);
                    if (writeOnLocalStorage) {
                        localStorage.setItem(
                            `${keyId}-conversation`,
                            JSON.stringify(chatConversationData)
                        );
                    }
                },
                delete: (chatKey: string) => {
                    if (chatConversation.length) setChatConversation([]);
                    localStorage.removeItem(`${chatKey}-conversation`);
                },
                reload: (keyId: string) => {
                    const conversationKey = `${keyId}-conversation`;
                    if (localStorage.getItem(conversationKey)) {
                        setChatConversation(
                            JSON.parse(
                                localStorage.getItem(conversationKey) as string
                            )
                        );
                    }
                },
                clear: () => {
                    for (const key in localStorage) {
                        if (key.endsWith('-conversation')) {
                            localStorage.removeItem(key);
                        }
                    }
                    if (chatConversation.length) setChatConversation([]);
                },
            },
            activeKey: {
                get: () => chatKey,
                set: (chatKeyData: string) => {
                    setChatKey(chatKeyData);
                },
            },
            loadingState: {
                get: () => chatLoadingState,
                set: (
                    chatLoadingStateData: ChatContent['chatLoadingState']
                ) => {
                    setChatLoadingState(chatLoadingStateData);
                },
            },
            streamingAnswer: {
                get: () => streamingAnswer,
                set: (streamingAnswerData: string) => {
                    setStreamingAnswer(streamingAnswerData);
                },
            },
        },
        config: {
            model: {
                get: () => modelGPT,
                set: (modelData: string) => {
                    setModelGPT(modelData);
                    localStorage.setItem('modelGPT', modelData);
                },
            },
            modelList: {
                get: () => modelGPTList,
                set: (modelList: ChatConfiguration['modelList']) => {
                    setModelGPTList(modelList);
                },
            },
            apiKey: {
                get: () => apiKey,
                set: (apiKeyData: string) => {
                    setApiKey(apiKeyData);
                    localStorage.setItem('apiKey', apiKeyData);
                },
            },
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
            if (apiKey && !modelGPTList.length) {
                const rawModelGPTList = await getModelGPTList(apiKey);
                if (!modelGPT) setModelGPT(rawModelGPTList?.data?.[0] || '');
                setModelGPTList(
                    rawModelGPTList?.data?.map(
                        (item: string): ModelGPTListItem => ({
                            name: item,
                            isActive: item === modelGPT ? true : undefined,
                        })
                    ) || []
                );
            }

            if (chatLoadingState === ChatLoadingState.LOADING) {
                const responseAnswer = await getStreamingAnswer(
                    apiKey,
                    modelGPT,
                    chatConversation
                );
                const readerAnswer = responseAnswer.body?.getReader();
                const decodeAnswer = new TextDecoder('utf-8');
                let answer = '';
                /* eslint-disable */
                while (true) {
                    // @ts-ignore
                    const { value, done } = await readerAnswer?.read();
                    if (done) {
                        chatContentContextValue.chat.conversation.set(
                            chatConversation.slice().concat([
                                {
                                    role: 'assistant',
                                    content: answer,
                                },
                            ]),
                            chatKey,
                            true
                        );
                        setStreamingAnswer('');
                        setChatLoadingState(ChatLoadingState.ACTIVE);
                        break;
                    }
                    answer += decodeAnswer.decode(value);
                    setStreamingAnswer(answer);
                }
            }
        })();
    }, [
        modelGPT,
        setModelGPT,
        apiKey,
        setModelGPTList,
        modelGPTList,
        chatLoadingState,
        setChatLoadingState,
    ]);

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
