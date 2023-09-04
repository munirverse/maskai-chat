import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    HStack,
    Badge,
    Stack,
    Link,
} from '@chakra-ui/react';
import { ModalCustomProps } from '../Interfaces';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function ModalAbout(props: ModalCustomProps) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>About</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody>
                    <Text fontWeight={'bold'} mb={'3'}>
                        Mask AI Chat is an Opensource Self-hosting Webchat for
                        ChatGPT/OpenAI API.
                    </Text>
                    <Text fontSize={'sm'}>
                        By utilizing the ChatGPT API, users can enjoy cost
                        savings as it is typically more affordable compared to a
                        general subscription. Additionally, the self-hosting
                        aspect provides users with increased privacy,
                        customization opportunities, and offline availability.
                        Furthermore, the project encourages community
                        collaboration, allowing for innovation, bug fixes, and
                        feature enhancements. Overall, this project enables
                        users to have greater control over their chatbot
                        implementation while enjoying the advantages of the
                        ChatGPT API at a more economical price point.
                    </Text>
                    <Box mt={'5'} fontSize={'xs'}>
                        <Stack>
                            <HStack>
                                <Text>Current Version:</Text>
                                <Badge borderRadius={'5'}>
                                    0.1.1-beta (free)
                                </Badge>
                            </HStack>
                            <HStack>
                                <Text>Project License:</Text>
                                <Badge borderRadius={'5'} colorScheme={'green'}>
                                    MIT
                                </Badge>
                            </HStack>
                            <HStack>
                                <Text>Github Repositories:</Text>
                                <Link
                                    href="https://github.com/lontarscript/maskai-chat"
                                    isExternal
                                >
                                    @lontarscript/maskai-chat{' '}
                                    <ExternalLinkIcon
                                        mx={'2px'}
                                    ></ExternalLinkIcon>
                                </Link>
                            </HStack>
                        </Stack>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button variant={'ghost'} onClick={props.onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalAbout;
