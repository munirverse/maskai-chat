import { KeyboardEvent, useEffect, useState } from 'react';
import { Textarea, forwardRef, useColorModeValue } from '@chakra-ui/react';
import ResizeTextArea from 'react-textarea-autosize';

export const MessageTextArea = forwardRef((props, ref) => {
    const [messageText, setMessageText] = useState('');

    const handleTextAreaSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            props.onSubmit(messageText);
            setMessageText('');
            e.preventDefault();
        }
    };
    // @ts-ignore
    const handleOnChange = (e) => {
        setMessageText(e.target.value);
    };

    return (
        <Textarea
            value={messageText}
            onChange={handleOnChange}
            onKeyDown={handleTextAreaSubmit}
            id="chatMessageTextArea"
            minH={'3.5rem'}
            minRows={1}
            maxRows={5}
            bg={useColorModeValue('white', 'gray.800')}
            w={'100%'}
            resize={'inherit'}
            pt={'15px'}
            pr={'3rem'}
            placeholder="Send a message..."
            fontSize={'lg'}
            as={ResizeTextArea}
            ref={ref}
            focusBorderColor={useColorModeValue('green.400', 'green.400')}
            {...props}
        ></Textarea>
    );
});
