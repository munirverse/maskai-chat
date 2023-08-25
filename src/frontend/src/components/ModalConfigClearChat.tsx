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
import { ModalCustomProps } from '../Interfaces';

function ModalConfigClearChat(
    props: ModalCustomProps<{
        confirmClearAllChat: (onClose: () => void) => void;
    }>
) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure to clear all chat?</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody>all chat will be delete after this action</ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="green"
                        onClick={() => props.confirmClearAllChat(props.onClose)}
                    >
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
