import { useContext, useState, useEffect, ChangeEvent } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Select,
} from '@chakra-ui/react';
import { ChatContentContext } from '../Contexts';
import {
    ModalCustomProps,
    ChatContentContextValues,
    ChatNotificationStatus,
} from '../Interfaces';

function ModalConfigModelGPT(props: ModalCustomProps) {
    // Chat Context
    const { config, chat } = useContext(
        ChatContentContext
    ) as ChatContentContextValues;

    const [tempModelGPT, setTempModelGPT] = useState('');

    const [activeButtonSave, setActiveButtonSave] = useState(false);

    const handleOnSelectModel = (e: ChangeEvent<HTMLSelectElement>) => {
        if (config.modelList.get().length) {
            setTempModelGPT(e.target.value);
            setActiveButtonSave(true);
        }
    };

    const handleOnSaveModel = () => {
        config.model.set(tempModelGPT);
        config.modelList.set(
            config.modelList.get().map((item) => {
                if (item.name === tempModelGPT) {
                    item.isActive = true;
                    return item;
                }
                delete item.isActive;
                return item;
            })
        );
        setActiveButtonSave(false);
        chat.notification.set({
            message: 'sucess change ai model',
            status: ChatNotificationStatus.SUCCESS,
        });
    };

    useEffect(() => {
        if (!tempModelGPT) {
            setTempModelGPT(config.model.get());
        }
    }, [tempModelGPT, setTempModelGPT, config.model]);

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>AI Models</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody>
                    <Select
                        id="modelGPTListSelect"
                        value={tempModelGPT}
                        onChange={handleOnSelectModel}
                        placeholder="Select AI model"
                    >
                        {config.modelList.get().length ? (
                            config.modelList.get().map((item, index) => (
                                <option
                                    key={`modelGPTListItem${index}`}
                                    value={item.name}
                                >
                                    {item.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Loading...</option>
                        )}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme={'green'}
                        onClick={handleOnSaveModel}
                        isDisabled={activeButtonSave ? undefined : true}
                    >
                        Save
                    </Button>
                    <Button variant={'ghost'} onClick={props.onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalConfigModelGPT;
