import { useContext } from 'react';
import {
    Box,
    BoxProps,
    Flex,
    FlexProps,
    InputGroup,
    InputRightElement,
    Button,
    ButtonProps,
    useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { MessageTextArea } from './MessageTextArea';
import { SidebarMobileContext } from '../Contexts';

export default function MainContent() {
    // @ts-ignore
    const [isActiveSidebarMobile] = useContext(SidebarMobileContext);

    const mainContentBoxProps: BoxProps = {
        h: 'full',
        flexGrow: 1,
        bg: useColorModeValue('gray.200', 'gray.700'),
    };
    const mainContentFlexProps: FlexProps = {
        flexDirection: 'column',
        h: 'full',
    };
    const mainContentChatInputProps: BoxProps = {
        minH: '110px',
        w: 'full',
        p: '2rem',
        bgGradient: useColorModeValue(
            'linear(to-b, transparent, gray.200, gray.300, gray.400)',
            'linear(to-b, transparent, gray.700, gray.800, gray.900)'
        ),
    };
    const mainContentSendButtonProps: ButtonProps = {
        mr: '1rem',
        mt: '1rem',
        bg: useColorModeValue('green.400', 'green.700'),
    };

    if (isActiveSidebarMobile) {
        mainContentBoxProps.display = 'none';
    }

    return (
        <Box {...mainContentBoxProps}>
            <Flex {...mainContentFlexProps}>
                <Box flexGrow={'1'}></Box>
                <Box {...mainContentChatInputProps}>
                    <InputGroup>
                        <MessageTextArea></MessageTextArea>
                        <InputRightElement>
                            <Button {...mainContentSendButtonProps}>
                                <ArrowForwardIcon></ArrowForwardIcon>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Flex>
        </Box>
    );
}
