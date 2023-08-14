import {
    Box,
    BoxProps,
    Flex,
    FlexProps,
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
import ChatTitleItem from './ChatTitleItem';
import { useState } from 'react';

interface ChatTitleItem {
    id: string;
    title: string;
    isActive?: 0 | 1;
}

export default function ChatTitleItems() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chatTitleItems, setChatTitleItems] = useState<ChatTitleItem[]>([
        {
            id: '1',
            title: 'chat a',
            isActive: 1,
        },
        {
            id: '2',
            title: 'chat b',
        },
        {
            id: '3',
            title: 'chat c',
        },
        {
            id: '4',
            title: 'chat d',
        },
    ]);
    const activeChatTitleItem = () =>
        chatTitleItems.filter((item) => item.isActive).at(0);

    const chatTitleListBoxProps: BoxProps = {
        w: 'full',
        flexGrow: 1,
        overflowY: 'auto',
        maxH: 'calc(100vh - 72px - 64px - 72px)',
    };
    const chatTitleListFlexProps: FlexProps = {
        flexDirection: 'column',
    };

    const handleChatItemDelete = (indexId: string | undefined) => {
        if (indexId) {
            setChatTitleItems((prevItems) =>
                prevItems.filter((item) => item.id !== indexId)
            );
        }
    };
    const handleChangeActiveTitleItem = (indexId: string) => {
        setChatTitleItems((prevItems) =>
            prevItems.map((item) => {
                if (item.isActive && item.id !== indexId) {
                    delete item.isActive;
                }
                if (item.id === indexId) {
                    item.isActive = 1;
                }

                return item;
            })
        );
    };
    const handleConfirmDeleteButton = (
        indexId: string | undefined,
        handleModalClose: () => void
    ) => {
        handleChatItemDelete(indexId);
        handleModalClose();
    };
    const handleChangeChatTitle = (
        indexId: string,
        currentTextValue: string
    ) => {
        setChatTitleItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === indexId) {
                    item.title = currentTextValue;
                }
                return item;
            })
        );
    };

    return (
        <Box {...chatTitleListBoxProps}>
            <Flex {...chatTitleListFlexProps}>
                <Stack spacing={0}>
                    {chatTitleItems.map((item) => (
                        <ChatTitleItem
                            key={item.id}
                            id={item.id}
                            text={item.title}
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
