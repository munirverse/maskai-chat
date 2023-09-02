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

export interface ModelGPTListItem {
    name: string;
    isActive: boolean | undefined;
}

export interface ConversationMessageItem {
    role: string;
    content: string;
}

export interface ChatContent {
    chatTitleList: ChatTitleItem[] | [];
    chatActiveConversation: ConversationMessageItem[] | [];
    chatActiveKey: string;
    chatLoadingState:
        | typeof ChatLoadingState.NOT_INIT
        | typeof ChatLoadingState.LOADING
        | typeof ChatLoadingState.ACTIVE;
}

export interface ChatConfiguration {
    apiKey: string;
    model: string;
    modelList: ModelGPTListItem[] | [];
    backupMode: boolean;
}

export interface ChatContentContextValues {
    chat: {
        titleList: {
            get: (data: void) => ChatContent['chatTitleList'];
            set: (data: ChatContent['chatTitleList']) => void;
        };
        conversation: {
            get: (data: void) => ChatContent['chatActiveConversation'];
            set: (
                data: ChatContent['chatActiveConversation'],
                data2?: string,
                data3?: boolean
            ) => void;
            delete: (data: string) => void;
            reload: (data: string) => void;
            clear: () => void;
        };
        activeKey: {
            get: (data: void) => ChatContent['chatActiveKey'];
            set: (data: ChatContent['chatActiveKey']) => void;
        };
        loadingState: {
            get: (data: void) => ChatContent['chatLoadingState'];
            set: (data: ChatContent['chatLoadingState']) => void;
        };
    };
    config: {
        model: {
            get: (data: void) => ChatConfiguration['model'];
            set: (data: ChatConfiguration['model']) => void;
        };
        apiKey: {
            get: (data: void) => ChatConfiguration['apiKey'];
            set: (data: ChatConfiguration['apiKey']) => void;
        };
        modelList: {
            get: (data: void) => ChatConfiguration['modelList'];
            set: (data: ChatConfiguration['modelList']) => void;
        };
    };
}
