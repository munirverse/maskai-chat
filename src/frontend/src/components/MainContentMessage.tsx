import { useContext } from 'react';
import {
    Stack,
    SkeletonText,
    SkeletonCircle,
    HStack,
    Box,
    Text,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaRobot, FaCircleUser } from 'react-icons/fa6';
import { ChatContentContext } from '../Contexts';
import { ChatContentContextValues, ChatLoadingState } from '../Interfaces';

export function MainContentMessage() {
    // Chat Context
    const { chat } = useContext(ChatContentContext) as ChatContentContextValues;

    const ContentConversationLoading = () => (
        <Stack spacing={10}>
            {Array.from({ length: 5 }).map((_, index) => (
                <HStack key={index} spacing={4}>
                    <SkeletonCircle size={'10'} />
                    <SkeletonText
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                        flex={1}
                    />
                </HStack>
            ))}
        </Stack>
    );

    const ContentConversationActive = () => (
        <Stack spacing={0}>
            {chat.conversation.get().map((item, index) => (
                <Box
                    key={`${item.role}${index}`}
                    bgColor={index % 2 === 0 ? 'gray.200' : 'whitesmoke'}
                    _dark={{ bg: index % 2 === 0 ? 'gray.700' : 'gray.900' }}
                    p={'2rem'}
                >
                    <HStack px={'1rem'} align={'flex-start'} spacing={5}>
                        <Icon
                            as={index % 2 === 0 ? FaCircleUser : FaRobot}
                            color={index % 2 === 0 ? 'gray.400' : 'green.400'}
                            _dark={{
                                color: index % 2 === 0 ? 'white' : 'green.200',
                            }}
                            boxSize={'2rem'}
                        ></Icon>
                        <Text>{item.content}</Text>
                    </HStack>
                </Box>
            ))}
            <Box
                bgColor={useColorModeValue('whitesmoke', 'gray.900')}
                p={'2rem'}
                display={
                    chat.loadingState.get() !== ChatLoadingState.LOADING
                        ? 'none'
                        : undefined
                }
            >
                <HStack px={'1rem'} align={'flex-start'} spacing={5}>
                    <Icon
                        as={FaRobot}
                        color={useColorModeValue('green.400', 'green.200')}
                        boxSize={'2rem'}
                    ></Icon>
                    <Text id="loadingAnswerChat"></Text>
                </HStack>
            </Box>
        </Stack>
    );

    const ContentConversationDisplay = () =>
        !chat.conversation.get().length ? (
            <ContentConversationLoading></ContentConversationLoading>
        ) : (
            <ContentConversationActive></ContentConversationActive>
        );

    return <ContentConversationDisplay></ContentConversationDisplay>;
}
