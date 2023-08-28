import {
    useContext,
    useState,
    KeyboardEvent,
    useEffect,
    ChangeEvent,
} from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Stack,
    InputGroup,
    Input,
    InputRightElement,
    useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { ChatContentContext } from '../Contexts';
import { ModalCustomProps } from '../Interfaces';

function ModalConfigApiKey(props: ModalCustomProps) {
    // Chat Context
    // @ts-ignore
    const { apiKey, updateApiKey } = useContext(ChatContentContext);

    // @ts-ignore
    const [apiKeyEditMode, setApiKeyEditMode] = useState(false);

    // @ts-ignore
    const [tempApiKey, setTempApiKey] = useState('');

    const handleSaveApiKey = () => {
        updateApiKey(tempApiKey);
        setApiKeyEditMode(false);
    };

    const handleChangeApiKey = (e: ChangeEvent<HTMLInputElement>) => {
        setTempApiKey(e.target.value);
    };

    const handleEnterApiKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tempApiKey) {
            handleSaveApiKey();
        }
    };

    const handleActiveEditMode = () => {
        setApiKeyEditMode(true);
    };

    useEffect(() => {
        if (apiKeyEditMode) {
            setTempApiKey(apiKey);
            document
                .querySelector<HTMLInputElement>('input#inputApiKey')
                ?.focus();
        }
    }, [setTempApiKey, apiKey, apiKeyEditMode]);

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>API Keys</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody>
                    <Stack>
                        <InputGroup
                            style={{
                                display: apiKeyEditMode ? undefined : 'none',
                            }}
                        >
                            <Input
                                id="inputApiKey"
                                name="inputApiKey"
                                value={tempApiKey}
                                onChange={handleChangeApiKey}
                                onKeyUp={handleEnterApiKey}
                                placeholder="insert your api key here"
                                autoFocus={true}
                                focusBorderColor={useColorModeValue(
                                    'green.400',
                                    'green.400'
                                )}
                            ></Input>
                        </InputGroup>
                        <InputGroup
                            style={{
                                display: !apiKeyEditMode ? undefined : 'none',
                            }}
                        >
                            <Input
                                value={apiKey}
                                isReadOnly
                                focusBorderColor={useColorModeValue(
                                    'green.400',
                                    'green.400'
                                )}
                            ></Input>
                            <InputRightElement>
                                <Button onClick={handleActiveEditMode}>
                                    <EditIcon></EditIcon>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        isDisabled={apiKey && apiKeyEditMode ? false : true}
                        colorScheme={'green'}
                        onClick={handleSaveApiKey}
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

export default ModalConfigApiKey;
