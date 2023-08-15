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

export interface ChatContent {
    titleChatlist: ChatTitleItem[] | unknown;
    activeChatConversation: unknown;
}

export interface DefaultProps {
    children?: ReactNode;
}
