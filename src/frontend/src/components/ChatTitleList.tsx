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
import {
    ChatTitleItem as iChatTitleItem,
    ChatLoadingState,
} from '../Interfaces';
import ChatTitleItem from './ChatTitleItem';

export default function ChatTitleItems() {
    // Chat Context
    const {
        // @ts-ignore
        chatTitleList,
        // @ts-ignore
        updateChatTitleList,
        // @ts-ignore
        updateChatKey,
        // @ts-ignore
        updateChatLoadingState,
        // @ts-ignore
        updateChatConversation,
    } = useContext(ChatContentContext);

    const activeChatTitleItem = () =>
        chatTitleList.filter((item: iChatTitleItem) => item.isActive).at(0);

    const handleChangeActiveTitleItem = (indexId: string) => {
        updateChatTitleList(
            chatTitleList.map((item: iChatTitleItem) => {
                if (item.isActive && item.id !== indexId) {
                    delete item.isActive;
                }
                if (item.id === indexId) {
                    item.isActive = 1;
                }

                return item;
            }),
            indexId
        );
        updateChatLoadingState(ChatLoadingState.LOADING);
    };

    const handleChatItemDelete = (indexId: string | undefined) => {
        if (indexId) {
            updateChatTitleList(
                chatTitleList.filter(
                    (item: iChatTitleItem) => item.id !== indexId
                ),
                ''
            );
        }
    };

    const handleChangeChatTitle = (
        indexId: string,
        currentTextValue: string
    ) => {
        updateChatTitleList(
            chatTitleList.map((item: iChatTitleItem) => {
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
        handleChatItemDelete(indexId);
        handleModalClose();
        updateChatKey('');
        updateChatLoadingState(ChatLoadingState.NOT_INIT);
        updateChatConversation([]);
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
                    {chatTitleList
                        .slice()
                        .reverse()
                        .map((item: iChatTitleItem) => (
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
