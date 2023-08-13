import React, { useState } from 'react';
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
}

export default function ChatTitleItem(props: ChatTitleItemProps) {
    // @ts-ignore
    const [isMenuItemHover, setMenuItemHover] = useState(0);
    // @ts-ignore
    const [isEditMode, setEditMode] = useState(0);
    // @ts-ignore
    const [titleText, setTitleText] = useState(props.text);

    const chatTitleItemBoxProps: BoxProps = {
        p: '1rem',
        _hover: {
            bg: useColorModeValue('gray.100', 'gray.900'),
            cursor: 'pointer',
        },
        key: props.id,
        onMouseEnter: () => setMenuItemHover(1),
        onMouseLeave: () => setMenuItemHover(0),
    };
    const chatTitleItemTextProps: TextProps = {
        fontSize: 'lg',
    };
    const chatTitleItemActionButtonProps: StackProps = {};

    if (!isMenuItemHover) {
        chatTitleItemActionButtonProps.display = 'none';
    }

    const closeEditMode = () => {
        setEditMode(0);
    };
    const applyEditAction = () => {
        setEditMode(0);
    };
    const changeTitleText = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTitleText(e.currentTarget.value);
            applyEditAction();
        }
    };

    const InputMode = () => (
        <InputGroup>
            <Input
                defaultValue={props.text}
                pr={'5rem'}
                onKeyDown={changeTitleText}
            ></Input>
            <InputRightElement pr={'2.5rem'}>
                <HStack>
                    <Button onClick={applyEditAction} size={'xs'}>
                        <CheckIcon></CheckIcon>
                    </Button>
                    <Button onClick={closeEditMode} size={'xs'}>
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
                        <EditIcon onClick={() => setEditMode(1)}></EditIcon>
                        <DeleteIcon></DeleteIcon>
                    </HStack>
                </Flex>
            )}
        </Box>
    );
}
``;
