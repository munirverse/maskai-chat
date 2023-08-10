import {
    Box,
    Flex,
    InputGroup,
    InputRightElement,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { MessageTextArea } from './MessageTextArea';

export default function MainContent() {
    return (
        <Box
            h={'full'}
            flexGrow={1}
            bg={useColorModeValue('gray.200', 'gray.700')}
        >
            <Flex flexDirection={'column'} h={'full'}>
                <Box flexGrow={'1'}></Box>
                <Box>
                    <Box
                        h={'full'}
                        minH={'110px'}
                        w={'full'}
                        top={'0'}
                        p={'2rem'}
                        bgGradient={useColorModeValue(
                            'linear(to-b, transparent, gray.100, gray.200, gray.300)',
                            'linear(to-b, transparent, gray.700, gray.800, gray.900)'
                        )}
                    >
                        <InputGroup>
                            <MessageTextArea></MessageTextArea>
                            <InputRightElement>
                                <Button
                                    mr={'1rem'}
                                    mt={'1rem'}
                                    bg={useColorModeValue(
                                        'green.400',
                                        'green.700'
                                    )}
                                >
                                    <ArrowForwardIcon></ArrowForwardIcon>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
