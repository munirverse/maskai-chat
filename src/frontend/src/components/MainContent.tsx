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
    Text,
    Stack,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { MessageTextArea } from './MessageTextArea';
import { SidebarMobileContext } from '../Contexts';
import MaskaiChatIcon from './MaskaiChatIcon';

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
        colorScheme: 'green',
    };

    if (isActiveSidebarMobile) {
        mainContentBoxProps.display = 'none';
    }

    return (
        <Box {...mainContentBoxProps}>
            <Flex {...mainContentFlexProps}>
                <Box flexGrow={'1'}>
                    <Box m={'0 auto'} w={'full'} p={'2rem'}>
                        <Stack
                            textAlign={'center'}
                            alignItems={'center'}
                            spacing={1}
                        >
                            <MaskaiChatIcon
                                fontSize={'9xl'}
                                color={useColorModeValue(
                                    'gray.400',
                                    'gray.800'
                                )}
                            ></MaskaiChatIcon>
                            <Text
                                fontSize={'4xl'}
                                mt={'-2.5rem'}
                                color={useColorModeValue(
                                    'gray.400',
                                    'gray.800'
                                )}
                            >
                                Mask Chat AI
                            </Text>
                            <Box
                                bg={useColorModeValue('gray.300', 'gray.800')}
                                color={useColorModeValue(
                                    'gray.500',
                                    'gray.600'
                                )}
                                fontSize={'md'}
                                p={'1rem'}
                                borderRadius={'0.5rem'}
                            >
                                "Masking UI of Chatgpt & OpenAI API for
                                yourself"<br></br>
                                Click `New Chat` and enjoy 😉
                            </Box>
                        </Stack>
                    </Box>
                </Box>
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
