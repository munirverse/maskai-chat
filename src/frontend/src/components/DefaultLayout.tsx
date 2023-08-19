import { useState } from 'react';
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import {
    DefaultProps,
    ChatContent,
    ChatActiveLoadingState,
    ChatTitleItem,
} from '../Interfaces';

export default function DefaultLayout({ children }: DefaultProps) {
    const storedTitleChatList = localStorage.getItem('titleChatlist');
    const storedActiveChatConversation = localStorage.getItem(
        'activeChatConversation'
    );
    const [isActiveSidebarMobile, setActiveSidebarMobile] =
        useState<boolean>(false);
    const [chatContent, setChatContent] = useState<ChatContent>({
        titleChatlist: storedTitleChatList
            ? JSON.parse(storedTitleChatList)
            : [],
        activeChatConversation: storedActiveChatConversation
            ? JSON.parse(storedActiveChatConversation)
            : [],
        activeChatKeyId: '',
        activeChatState: ChatActiveLoadingState.NOT_INIT,
    });

    const sidebarMobileContextValue = [
        isActiveSidebarMobile,
        setActiveSidebarMobile,
    ];
    const chatContentContextValue = {
        chatContent,
        setActiveTitleChatList: (
            titleChatListData: ChatTitleItem[],
            titleChatId: string
        ) => {
            setChatContent((previousChatContent) => ({
                ...previousChatContent,
                titleChatlist: titleChatListData,
                activeChatKeyId: titleChatId,
                activeChatState: ChatActiveLoadingState.LOADING,
            }));
            localStorage.setItem(
                'titleChatlist',
                JSON.stringify(titleChatListData)
            );
        },
        setActiveChatConversation: (activeChatConversationData: unknown[]) => {
            setChatContent((previousChatContent) => ({
                ...previousChatContent,
                activeChatConversation: activeChatConversationData,
            }));
            localStorage.setItem(
                'activeChatConversation',
                JSON.stringify(activeChatConversationData)
            );
        },
        setNewChatMode: () => {
            setChatContent((previousChatContent) => ({
                ...previousChatContent,
                activeChatKeyId: '',
                activeChatState: ChatActiveLoadingState.NOT_INIT,
                activeChatConversation: [],
            }));
        },
        setClearActiveChat: () => {
            setChatContent((previousChatContent) => ({
                ...previousChatContent,
                titleChatlist: previousChatContent.titleChatlist.map(
                    (item: ChatTitleItem) => {
                        if (item.isActive) delete item.isActive;
                        return item;
                    }
                ),
            }));
        },
    };

    const defaultLayoutBoxProps: BoxProps = {
        h: '100vh',
    };
    const defaultLayoutFlexProps: FlexProps = {
        flexDirection: 'column',
        h: 'full',
    };

    return (
        <ChatContentContext.Provider value={chatContentContextValue}>
            <SidebarMobileContext.Provider value={sidebarMobileContextValue}>
                <Box {...defaultLayoutBoxProps}>
                    <Flex {...defaultLayoutFlexProps}>{children}</Flex>
                </Box>
            </SidebarMobileContext.Provider>
        </ChatContentContext.Provider>
    );
}
