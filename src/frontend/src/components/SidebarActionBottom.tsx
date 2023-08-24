import { useContext } from 'react';
import {
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
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
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                        <MenuItem>API Keys</MenuItem>
                        <MenuItem>AI Models</MenuItem>
                        <MenuItem onClick={onOpen}>Clear All Chat</MenuItem>
                        <MenuItem icon={<WarningTwoIcon />} isDisabled={true}>
                            Backup Conversation
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure to clear all chat?</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody>
                        all chat will be delete after this action
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            onClick={() => handleClearAllChat(onClose)}
                        >
                            OK
                        </Button>
                        <Button variant={'ghost'} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
