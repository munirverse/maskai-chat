import { Box, Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
    return (
        <>
            <Box h="100vh">
                <Flex flexDirection={'column'} h={'full'}>
                    <Navbar></Navbar>
                    <Flex flex={'1'}>
                        <Sidebar></Sidebar>
                        <MainContent></MainContent>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

export default App;
