import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

export default function ChatTitleItems(props) {
    // const items = Array.from({ length: 5 }, (_, index) => (
    //     <div>
    //         <h1 key={index}>Test</h1>
    //         <br />
    //     </div>
    // ));

    return (
        <Box
            w={'full'}
            flexGrow={'1'}
            overflowY={'auto'}
            flexBasis={'100%'}
            maxHeight={'calc(100vh - 72px - 105px - 64px)'}
        >
            <Flex flexDirection={'column'}>
                <h1>Test</h1>
            </Flex>
        </Box>
    );
}
