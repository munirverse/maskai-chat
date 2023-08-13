import { Box, BoxProps, Flex, FlexProps, Stack } from '@chakra-ui/react';
import ChatTitleItem from './ChatTitleItem';

export default function ChatTitleItems() {
    const lisTitleItems: string[] = ['chat a', 'chat b'];

    const chatTitleListBoxProps: BoxProps = {
        w: 'full',
        flexGrow: 1,
        overflowY: 'auto',
        maxH: 'calc(100vh - 72px - 64px - 72px)',
    };
    const chatTitleListFlexProps: FlexProps = {
        flexDirection: 'column',
    };

    return (
        <Box {...chatTitleListBoxProps}>
            <Flex {...chatTitleListFlexProps}>
                <Stack>
                    {lisTitleItems.map((item, index) => (
                        <ChatTitleItem
                            key={index}
                            id={`chatTitleItem${index}`}
                            text={item}
                        ></ChatTitleItem>
                    ))}
                </Stack>
            </Flex>
        </Box>
    );
}
