import { useState } from 'react';
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import { DefaultProps, ChatContent } from '../Interfaces';

export default function DefaultLayout({ children }: DefaultProps) {
    const [isActiveSidebarMobile, setActiveSidebarMobile] = useState(false);
    const [chatContent, setChatContent] = useState<ChatContent>({
        titleChatlist: null,
        activeChatConversation: null,
    });

    const defaultLayoutBoxProps: BoxProps = {
        h: '100vh',
    };
    const defaultLayoutFlexProps: FlexProps = {
        flexDirection: 'column',
        h: 'full',
    };

    return (
        <ChatContentContext.Provider value={[chatContent, setChatContent]}>
            <SidebarMobileContext.Provider
                value={[isActiveSidebarMobile, setActiveSidebarMobile]}
            >
                <Box {...defaultLayoutBoxProps}>
                    <Flex {...defaultLayoutFlexProps}>{children}</Flex>
                </Box>
            </SidebarMobileContext.Provider>
        </ChatContentContext.Provider>
    );
}
