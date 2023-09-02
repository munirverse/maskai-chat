import { useContext } from 'react';
import {
    Box,
    Flex,
    Stack,
    Modal,
    ModalOverlay,
    useDisclosure,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';
import { ChatContentContext } from '../Contexts';
import { ChatLoadingState, ChatContentContextValues } from '../Interfaces';
import ChatTitleItem from './ChatTitleItem';

export default function ChatTitleItems() {
    // Chat Context
    const { chat } = useContext(ChatContentContext) as ChatContentContextValues;

    const activeChatTitleItem = () =>
        chat.titleList
            .get()
            .filter((item) => item.isActive)
            .at(0);

    const handleChangeActiveTitleItem = (indexId: string) => {
        chat.titleList.set(
            chat.titleList.get().map((item) => {
                if (item.isActive && item.id !== indexId) {
                    delete item.isActive;
                }
                if (item.id === indexId) {
                    item.isActive = 1;
                }

                return item;
            })
        );
        chat.activeKey.set(indexId);
        chat.conversation.reload(indexId);
        chat.loadingState.set(ChatLoadingState.ACTIVE);
    };

    const handleChatItemDelete = (indexId: string | undefined) => {
        if (indexId) {
            chat.titleList.set(
                chat.titleList.get().filter((item) => item.id !== indexId)
            );
        }
    };

    const handleChangeChatTitle = (
        indexId: string,
        currentTextValue: string
    ) => {
        chat.titleList.set(
            chat.titleList.get().map((item) => {
                if (item.id === indexId) {
                    item.title = currentTextValue;
                }
                return item;
            })
        );
    };

    // Modal Confirmation Delete Chat Tittle State
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleConfirmDeleteButton = (
        indexId: string | undefined,
        handleModalClose: () => void
    ) => {
        if (indexId) {
            handleChatItemDelete(indexId);
            handleModalClose();
            chat.activeKey.set('');
            chat.loadingState.set(ChatLoadingState.NOT_INIT);
            chat.conversation.delete(indexId);
        }
    };

    return (
        <Box
            w={'full'}
            flexGrow={1}
            overflowY={'auto'}
            maxH={'calc(100vh - 72px - 64px - 72px)'}
        >
            <Flex flexDirection={'column'}>
                <Stack spacing={0}>
                    {chat.titleList
                        .get()
                        .slice()
                        .reverse()
                        .map((item) => (
                            <ChatTitleItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                onSelect={() =>
                                    handleChangeActiveTitleItem(item.id)
                                }
                                isActive={item.isActive || 0}
                                onDeleteConfirmation={onOpen}
                                onSave={handleChangeChatTitle}
                            ></ChatTitleItem>
                        ))}
                </Stack>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure to delete this chat?</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody>
                        `{activeChatTitleItem()?.title}` will be delete after
                        this action
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            onClick={() =>
                                handleConfirmDeleteButton(
                                    activeChatTitleItem()?.id,
                                    onClose
                                )
                            }
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
