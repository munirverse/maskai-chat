import { useContext } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { ChatContentContext } from '../Contexts';
import {
    ModalCustomProps,
    ChatNotificationStatus,
    ChatContentContextValues,
} from '../Interfaces';

function ModalConfigClearChat(
    props: ModalCustomProps<{
        confirmClearAllChat: (onClose: () => void) => void;
    }>
) {
    const { chat } = useContext(ChatContentContext) as ChatContentContextValues;

    const handleOnConfirm = () => {
        props.confirmClearAllChat(props.onClose);
        chat.notification.set({
            message: 'success clear all chat',
            status: ChatNotificationStatus.SUCCESS,
        });
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure to clear all chat?</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody>all chat will be delete after this action</ModalBody>
                <ModalFooter>
                    <Button colorScheme="green" onClick={handleOnConfirm}>
                        OK
                    </Button>
                    <Button variant={'ghost'} onClick={props.onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalConfigClearChat;
