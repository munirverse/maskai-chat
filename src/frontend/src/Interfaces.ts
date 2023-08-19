import { ReactNode } from 'react';

export interface ChatTitleItem {
    id: string;
    title: string;
    isActive?: 0 | 1 | undefined;
}

export interface ChatTitleItemProps extends ChatTitleItem {
    onSelect: () => void;
    onDeleteConfirmation: () => void;
    onSave: (indexId: string, currentTextValue: string) => void;
}

export const ChatActiveLoadingState = {
    NOT_INIT: 'notinit',
    LOADING: 'loading',
    ACTIVE: 'active',
} as const;

export interface ChatContent {
    titleChatlist: ChatTitleItem[] | [];
    activeChatConversation: unknown[];
    activeChatKeyId: string;
    activeChatState:
        | typeof ChatActiveLoadingState.NOT_INIT
        | typeof ChatActiveLoadingState.LOADING
        | typeof ChatActiveLoadingState.ACTIVE;
}

export interface DefaultProps {
    children?: ReactNode;
}
