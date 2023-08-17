import { useState } from 'react';
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import {
    DefaultProps,
    ChatContent,
    ChatActiveLoadingState,
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
            : [
                  {
                      id: '1',
                      title: 'chat a',
                      isActive: 1,
                  },
                  {
                      id: '2',
                      title: 'chat b',
                  },
                  {
                      id: '3',
                      title: 'chat c',
                  },
                  {
                      id: '4',
                      title: 'chat d',
                  },
              ],
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
            titleChatListData: unknown[],
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
