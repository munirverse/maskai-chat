import {
    Stack,
    StackProps,
    Text,
    TextProps,
    Box,
    BoxProps,
    IconProps,
    useColorModeValue,
} from '@chakra-ui/react';
import MaskaiChatIcon from './MaskaiChatIcon';

export function MainContentDefault() {
    const mainContentDefaultStackProps: StackProps = {
        textAlign: 'center',
        alignItems: 'center',
        spacing: 1,
    };
    const mainContentDefaulIconProps: IconProps = {
        fontSize: '9xl',
        color: useColorModeValue('gray.400', 'gray.800'),
    };
    const mainContentDefaultTitleProps: TextProps = {
        fontSize: '4xl',
        mt: '-2.5rem',
        color: useColorModeValue('gray.400', 'gray.800'),
    };
    const mainContentDefaultDescriptionProps: BoxProps = {
        bg: useColorModeValue('gray.300', 'gray.800'),
        color: useColorModeValue('gray.500', 'gray.600'),
        fontSize: 'md',
        p: '1rem',
        borderRadius: '0.5rem',
    };

    return (
        <Stack {...mainContentDefaultStackProps}>
            <MaskaiChatIcon {...mainContentDefaulIconProps}></MaskaiChatIcon>
            <Text {...mainContentDefaultTitleProps}>Mask Chat AI</Text>
            <Box {...mainContentDefaultDescriptionProps}>
                "An Opensource Self-hosting Webchat for ChatGPT/OpenAI API
                Services"<br></br>
                Click `New Chat` and enjoy 😉
            </Box>
        </Stack>
    );
}
