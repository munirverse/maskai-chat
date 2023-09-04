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
import { ChatLoadingState, ChatContentContextValues } from '../Interfaces';
import ModalConfigClearChat from './ModalConfigClearChat';
import ModalConfigApiKey from './ModalConfigApiKey';
import ModalConfigModelGPT from './ModalConfigModelGPT';
import ModalAbout from './ModalAbout';

export default function SidebarActionBottom() {
    // Chat Context
    const { chat } = useContext(ChatContentContext) as ChatContentContextValues;

    const handleClearAllChat = (onClose: () => void) => {
        chat.titleList.set([]);
        chat.loadingState.set(ChatLoadingState.NOT_INIT);
        chat.activeKey.set('');
        chat.conversation.clear();
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

    // Modal Model GPT State
    const {
        isOpen: isOpenModelGPTModal,
        onOpen: onOpenModelGPTModal,
        onClose: onCloseModelGPTModal,
    } = useDisclosure();

    // Modal About
    const {
        isOpen: isOpenModalAbout,
        onOpen: onOpenModalAbout,
        onClose: onCloseModalAbout,
    } = useDisclosure();

    return (
        <Box bg={useColorModeValue('white', 'gray.900')} p={'1rem'}>
            <HStack>
                <Menu>
                    <Button onClick={onOpenModalAbout}>
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
                        <MenuItem onClick={onOpenModelGPTModal}>
                            AI Models
                        </MenuItem>
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
            <ModalConfigModelGPT
                isOpen={isOpenModelGPTModal}
                onClose={onCloseModelGPTModal}
            ></ModalConfigModelGPT>
            <ModalAbout
                isOpen={isOpenModalAbout}
                onClose={onCloseModalAbout}
            ></ModalAbout>
        </Box>
    );
}
