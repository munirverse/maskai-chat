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

export interface DefaultProps {
    children?: ReactNode;
}

export type ModalCustomProps<T = object> = {
    isOpen: boolean;
    onClose: () => void;
} & DefaultProps &
    T;

export const ChatLoadingState = {
    NOT_INIT: 'notinit',
    LOADING: 'loading',
    ACTIVE: 'active',
} as const;

export interface ChatContent {
    chatTitleList: ChatTitleItem[] | [];
    chatActiveConversation: unknown[];
    chatActiveKey: string;
    chatLoadingState:
        | typeof ChatLoadingState.NOT_INIT
        | typeof ChatLoadingState.LOADING
        | typeof ChatLoadingState.ACTIVE;
}

export interface ChatConfiguration {
    apiKey: string;
    model: string;
    backupMode: boolean;
}
