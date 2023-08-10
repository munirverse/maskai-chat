import { Box, Flex, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import ChatTitleItems from './ChatTitleItems';

export default function Sidebar() {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            h={'full'}
            w={{ base: 'full', md: '20rem' }}
            maxW={{ md: '20rem' }}
        >
            <Flex flexDirection={'column'} h={'full'}>
                <Box p={'1rem'} h={'72px'}>
                    <Button
                        bg={useColorModeValue('green.400', 'green.700')}
                        w={'full'}
                    >
                        <PlusSquareIcon marginRight={'2'}></PlusSquareIcon>
                        <Text>New Chat</Text>
                    </Button>
                </Box>
                <ChatTitleItems></ChatTitleItems>
                <Box h={'105px'} bg={useColorModeValue('gray.100', 'gray.900')}>
                    <Text>Testing</Text>
                </Box>
            </Flex>
        </Box>
    );
}
