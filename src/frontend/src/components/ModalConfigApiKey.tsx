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
import { ModalCustomProps, ChatContentContextValues } from '../Interfaces';

function ModalConfigApiKey(props: ModalCustomProps) {
    // Chat Context
    const { config } = useContext(
        ChatContentContext
    ) as ChatContentContextValues;

    // @ts-ignore
    const [apiKeyEditMode, setApiKeyEditMode] = useState(false);

    // @ts-ignore
    const [tempApiKey, setTempApiKey] = useState('');

    const handleSaveApiKey = () => {
        config.apiKey.set(tempApiKey);
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

    const handleOnClose = () => {
        setApiKeyEditMode(false);
        if (!tempApiKey) setTempApiKey(config.apiKey.get());
        props.onClose();
    };

    useEffect(() => {
        if (apiKeyEditMode) {
            setTempApiKey(config.apiKey.get());
            document
                .querySelector<HTMLInputElement>('input#inputApiKey')
                ?.focus();
        }
    }, [setTempApiKey, config.apiKey, apiKeyEditMode]);

    return (
        <Modal isOpen={props.isOpen} onClose={handleOnClose}>
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
                                value={config.apiKey.get()}
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
                        isDisabled={tempApiKey && apiKeyEditMode ? false : true}
                        colorScheme={'green'}
                        onClick={handleSaveApiKey}
                    >
                        Save
                    </Button>
                    <Button variant={'ghost'} onClick={handleOnClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalConfigApiKey;
