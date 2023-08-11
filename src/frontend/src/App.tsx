import { Flex } from '@chakra-ui/react';
import DefaultLayout from './components/DefaultLayout';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './assets/custom.scss';

function App() {
    return (
        <>
            <DefaultLayout>
                <Navbar></Navbar>
                <Flex flex={'1'}>
                    <Sidebar></Sidebar>
                    <MainContent></MainContent>
                </Flex>
            </DefaultLayout>
        </>
    );
}

export default App;
