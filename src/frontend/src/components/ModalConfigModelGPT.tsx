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
import { ModalCustomProps, ModelGPTListItem } from '../Interfaces';

function ModalConfigModelGPT(props: ModalCustomProps) {
    // Chat Context
    // @ts-ignore
    const { modelGPT, updateModelGPT, modelGPTList, updateModelGPTList } =
        useContext(ChatContentContext);

    const [tempModelGPT, setTempModelGPT] = useState('');

    const [activeButtonSave, setActiveButtonSave] = useState(false);

    const handleOnSelectModel = (e: ChangeEvent<HTMLSelectElement>) => {
        if (modelGPTList.length) {
            setTempModelGPT(e.target.value);
            setActiveButtonSave(true);
        }
    };

    const handleOnSaveModel = () => {
        updateModelGPT(tempModelGPT);
        updateModelGPTList(
            modelGPTList.map((item: ModelGPTListItem) => {
                if (item.name === tempModelGPT) {
                    item.isActive = true;
                    return item;
                }
                delete item.isActive;
                return item;
            })
        );
        setActiveButtonSave(false);
    };

    useEffect(() => {
        if (!tempModelGPT) {
            setTempModelGPT(modelGPT);
        }
    }, [tempModelGPT, setTempModelGPT, modelGPT]);

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
                        {modelGPTList.length ? (
                            modelGPTList.map(
                                (item: ModelGPTListItem, index: number) => (
                                    <option
                                        key={`modelGPTListItem${index}`}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </option>
                                )
                            )
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
