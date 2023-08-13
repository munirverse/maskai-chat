import {
    Box,
    BoxProps,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    ChevronDownIcon,
    QuestionIcon,
    WarningTwoIcon,
} from '@chakra-ui/icons';

export default function SidebarActionBottom() {
    const sideBarActionBottomProps: BoxProps = {
        bg: useColorModeValue('white', 'gray.900'),
        p: '1rem',
    };

    return (
        <Box {...sideBarActionBottomProps}>
            <HStack>
                <Menu>
                    <Button>
                        <QuestionIcon></QuestionIcon>
                    </Button>
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        w={'full'}
                    >
                        Configuration
                    </MenuButton>
                    <MenuList>
                        <MenuItem>API Keys</MenuItem>
                        <MenuItem>AI Models</MenuItem>
                        <MenuItem>Clear All Chat</MenuItem>
                        <MenuItem icon={<WarningTwoIcon />} isDisabled={true}>
                            Backup Conversation
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Box>
    );
}
