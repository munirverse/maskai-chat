import { Flex } from '@chakra-ui/react';
import HomeLayout from '../layouts/HomeLayout';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

function Home() {
    return (
        <HomeLayout>
            <Navbar></Navbar>
            <Flex flex={'1'}>
                <Sidebar></Sidebar>
                <MainContent></MainContent>
            </Flex>
        </HomeLayout>
    );
}

export default Home;
