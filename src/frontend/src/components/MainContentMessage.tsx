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
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ChatContentContext } from '../Contexts';
import { ChatContentContextValues, ChatLoadingState } from '../Interfaces';

import { marked } from 'marked';

export function MainContentMessage() {
    // Chat Context
    const { chat } = useContext(ChatContentContext) as ChatContentContextValues;

    const markup = () => {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            breaks: false,
        });

        const rawMarkup = marked(chat.streamingAnswer.get());

        return {
            __html: rawMarkup,
        };
    };

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
        <Stack spacing={0} flexWrap={'wrap'} fontSize={'lg'}>
            {chat.conversation.get().map((item, index) => (
                <Box
                    key={`${item.role}${index}`}
                    bgColor={item.role === 'user' ? 'gray.200' : 'whitesmoke'}
                    _dark={{
                        bg: item.role === 'user' ? 'gray.700' : 'gray.900',
                    }}
                    p={'1rem'}
                >
                    <HStack px={'1rem'} align={'flex-start'} spacing={1}>
                        <Icon
                            as={item.role === 'user' ? FaCircleUser : FaRobot}
                            color={
                                item.role === 'user' ? 'gray.400' : 'green.400'
                            }
                            _dark={{
                                color:
                                    item.role === 'user'
                                        ? 'white'
                                        : 'green.200',
                            }}
                            boxSize={'2rem'}
                        ></Icon>
                        <Box pl={'2'} lineHeight={'2rem'} flexWrap={'wrap'}>
                            {item.role === 'user' ? (
                                <Text>{item.content}</Text>
                            ) : (
                                <ReactMarkdown
                                    remarkPlugins={[gfm]}
                                    components={{
                                        code({
                                            inline,
                                            className,
                                            children,
                                            ...props
                                        }) {
                                            const match = /language-(\w+)/.exec(
                                                className || ''
                                            );
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    {...props}
                                                    children={String(
                                                        children
                                                    ).replace(/\n$/, '')}
                                                    style={atomOneDark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    wrapLines="true"
                                                    wrapLongLines="true"
                                                />
                                            ) : (
                                                <code
                                                    {...props}
                                                    className={className}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {item.content}
                                </ReactMarkdown>
                            )}
                        </Box>
                    </HStack>
                </Box>
            ))}
            <Box
                bgColor={useColorModeValue('whitesmoke', 'gray.900')}
                p={'1rem'}
                display={
                    chat.loadingState.get() !== ChatLoadingState.LOADING
                        ? 'none'
                        : undefined
                }
                flexWrap={'wrap'}
            >
                <HStack px={'1rem'} align={'flex-start'} spacing={1}>
                    <Icon
                        as={FaRobot}
                        color={useColorModeValue('green.400', 'green.200')}
                        boxSize={'2rem'}
                    ></Icon>
                    <Box pl={'2'} lineHeight={'2rem'} flexWrap={'wrap'}>
                        <Text
                            id="loadingAnswerChat"
                            dangerouslySetInnerHTML={markup()}
                            flexWrap={'wrap'}
                        ></Text>
                    </Box>
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
