import { Textarea, forwardRef, useColorModeValue } from '@chakra-ui/react';
import ResizeTextArea from 'react-textarea-autosize';

export const MessageTextArea = forwardRef((props, ref) => {
    return (
        <Textarea
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
            _focus={{
                borderColor: useColorModeValue('green.400', 'green.400'),
            }}
            {...props}
        ></Textarea>
    );
});
