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
import { useContext } from 'react';
import { ChatContentContext } from '../Contexts';
import { ChatTitleItem as iChatTitleItem } from '../Interfaces';

export default function ChatTitleItems() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // @ts-ignore
    const { chatContent, setActiveTitleChatList } =
        useContext(ChatContentContext);

    const activeChatTitleItem = () =>
        chatContent.titleChatlist
            .filter((item: iChatTitleItem) => item.isActive)
            .at(0);

    const handleChatItemDelete = (indexId: string | undefined) => {
        if (indexId) {
            setActiveTitleChatList(
                chatContent.titleChatlist.filter(
                    (item: iChatTitleItem) => item.id !== indexId
                )
            );
        }
    };
    const handleChangeActiveTitleItem = (indexId: string) => {
        setActiveTitleChatList(
            chatContent.titleChatlist.map((item: iChatTitleItem) => {
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
        setActiveTitleChatList(
            chatContent.titleChatlist.map((item: iChatTitleItem) => {
                if (item.id === indexId) {
                    item.title = currentTextValue;
                }
                return item;
            })
        );
    };

    const chatTitleListBoxProps: BoxProps = {
        w: 'full',
        flexGrow: 1,
        overflowY: 'auto',
        maxH: 'calc(100vh - 72px - 64px - 72px)',
    };
    const chatTitleListFlexProps: FlexProps = {
        flexDirection: 'column',
    };

    return (
        <Box {...chatTitleListBoxProps}>
            <Flex {...chatTitleListFlexProps}>
                <Stack spacing={0}>
                    {chatContent.titleChatlist.map((item: iChatTitleItem) => (
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
