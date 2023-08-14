import { useState, KeyboardEvent } from 'react';
import {
    Box,
    BoxProps,
    Text,
    TextProps,
    HStack,
    StackProps,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    ChatIcon,
    EditIcon,
    DeleteIcon,
    CloseIcon,
    CheckIcon,
} from '@chakra-ui/icons';

interface ChatTitleItemProps {
    id: string;
    text: string;
    onSelect: () => void;
    onDeleteConfirmation: () => void;
    onSave: (indexId: string, currentTextValue: string) => void;
    isActive?: 0 | 1 | undefined;
}

export default function ChatTitleItem(props: ChatTitleItemProps) {
    // @ts-ignore
    const [isEditMode, setEditMode] = useState(0);
    // @ts-ignore
    const [titleText, setTitleText] = useState(props.text);

    const chatTitleItemBoxProps: BoxProps = {
        p: '1rem',
        bg: useColorModeValue(
            props.isActive ? 'gray.200' : 'white',
            props.isActive ? 'black' : 'gray.800'
        ),
        _hover: {
            bg: useColorModeValue(
                props.isActive ? 'gray.200' : 'gray.100',
                props.isActive ? 'black' : 'gray.900'
            ),
            cursor: 'pointer',
        },
        key: props.id,
        onMouseLeave: () => {
            setEditMode(0);
        },
        onClick: props.onSelect,
    };
    const chatTitleItemTextProps: TextProps = {
        fontSize: 'lg',
    };
    const chatTitleItemActionButtonProps: StackProps = {
        display: 'none',
    };

    if (props.isActive) {
        delete chatTitleItemActionButtonProps.display;
    }
    if (isEditMode) {
        delete chatTitleItemBoxProps.onClick;
    }

    const applyEditAction = (searchDOMInput?: boolean) => {
        if (searchDOMInput) {
            const currentText = document.querySelector(
                `input#inputEdit${props.id}`
            ) as HTMLInputElement;
            setTitleText(currentText.value);
            props.onSave(props.id, currentText.value);
        }
        setEditMode(0);
    };
    const changeTitleText = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTitleText(e.currentTarget.value);
            props.onSave(props.id, e.currentTarget.value);
            applyEditAction();
        }
    };

    const InputMode = () => (
        <InputGroup size={'md'}>
            <Input
                id={`inputEdit${props.id}`}
                defaultValue={titleText}
                pr={'5rem'}
                onKeyDown={changeTitleText}
            ></Input>
            <InputRightElement pr={'2.5rem'}>
                <HStack>
                    <Button onClick={() => applyEditAction(true)} size={'xs'}>
                        <CheckIcon></CheckIcon>
                    </Button>
                    <Button onClick={() => setEditMode(0)} size={'xs'}>
                        <CloseIcon></CloseIcon>
                    </Button>
                </HStack>
            </InputRightElement>
        </InputGroup>
    );

    return (
        <Box {...chatTitleItemBoxProps}>
            {isEditMode ? (
                <InputMode></InputMode>
            ) : (
                <Flex justifyContent={'space-between'}>
                    <HStack>
                        <ChatIcon></ChatIcon>
                        <Text {...chatTitleItemTextProps}>{titleText}</Text>
                    </HStack>
                    <HStack {...chatTitleItemActionButtonProps}>
                        <Button onClick={() => setEditMode(1)} size={'xs'}>
                            <EditIcon></EditIcon>
                        </Button>
                        <Button
                            size={'xs'}
                            onClick={props.onDeleteConfirmation}
                        >
                            <DeleteIcon></DeleteIcon>
                        </Button>
                    </HStack>
                </Flex>
            )}
        </Box>
    );
}
``;