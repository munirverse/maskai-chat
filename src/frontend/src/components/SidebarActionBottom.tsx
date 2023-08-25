import { useContext } from 'react';
import {
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    HStack,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {
    ChevronDownIcon,
    QuestionIcon,
    WarningTwoIcon,
} from '@chakra-ui/icons';
import { ChatContentContext } from '../Contexts';
import { ChatLoadingState } from '../Interfaces';
import ModalConfigClearChat from './ModalConfigClearChat';
import ModalConfigApiKey from './ModalConfigApiKey';

export default function SidebarActionBottom() {
    // Chat Context
    // @ts-ignore
    const {
        // @ts-ignore
        updateChatTitleList,
        // @ts-ignore
        updateChatLoadingState,
        // @ts-ignore
        updateChatConversation,
        // @ts-ignore
        updateChatKey,
    } = useContext(ChatContentContext);

    const handleClearAllChat = (onClose: () => void) => {
        updateChatTitleList([]);
        updateChatLoadingState(ChatLoadingState.NOT_INIT);
        updateChatConversation([]);
        updateChatKey('');
        onClose();
    };

    // Modal Confirmation Clear All Chat State
    const {
        isOpen: isOpenClearChatModal,
        onOpen: onOpenClearChatModal,
        onClose: onCloseClearChatModal,
    } = useDisclosure();

    // Modal Api Key State
    const {
        isOpen: isOpenApiKeyModal,
        onOpen: onOpenApiKeyModal,
        onClose: onCloseApiKeyModal,
    } = useDisclosure();

    return (
        <Box bg={useColorModeValue('white', 'gray.900')} p={'1rem'}>
            <HStack>
                <Menu>
                    <Button>
                        <QuestionIcon></QuestionIcon>
                    </Button>
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        w={'full'}
                    >
                        Configuration
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={onOpenApiKeyModal}>
                            API Keys
                        </MenuItem>
                        <MenuItem>AI Models</MenuItem>
                        <MenuItem onClick={onOpenClearChatModal}>
                            Clear All Chat
                        </MenuItem>
                        <MenuItem icon={<WarningTwoIcon />} isDisabled={true}>
                            Backup Conversation
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <ModalConfigClearChat
                isOpen={isOpenClearChatModal}
                onClose={onCloseClearChatModal}
                confirmClearAllChat={handleClearAllChat}
            ></ModalConfigClearChat>
            <ModalConfigApiKey
                isOpen={isOpenApiKeyModal}
                onClose={onCloseApiKeyModal}
            ></ModalConfigApiKey>
        </Box>
    );
}
