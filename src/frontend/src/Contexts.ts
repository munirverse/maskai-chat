import { createContext } from 'react';
import { ChatContent } from './Interfaces';

export const SidebarMobileContext = createContext({});

export const ChatContentContext = createContext<ChatContent>({
    titleChatlist: [],
    activeChatConversation: [],
});
