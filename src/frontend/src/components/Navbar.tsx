'use client';

import {
    Box,
    Flex,
    Button,
    Text,
    useColorModeValue,
    Stack,
    useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import MaskaiChatIcon from './MaskaiChatIcon';

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Box>
                        <Flex alignItems={'center'} gap={3}>
                            <Button display={{ md: 'none' }}>
                                <HamburgerIcon></HamburgerIcon>
                            </Button>
                            <MaskaiChatIcon fontSize={'2xl'} />
                            <Text fontSize={'lg'} fontWeight={'extrabold'}>
                                Mask AI Chat
                            </Text>
                        </Flex>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
