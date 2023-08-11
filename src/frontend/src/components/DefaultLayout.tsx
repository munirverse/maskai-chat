import React, { useState } from 'react';
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { SidebarMobileContext } from '../Contexts';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
    const [isActiveSidebarMobile, setActiveSidebarMobile] = useState(false);

    const defaultLayoutBoxProps: BoxProps = {
        h: '100vh',
    };
    const defaultLayoutFlexProps: FlexProps = {
        flexDirection: 'column',
        h: 'full',
    };

    return (
        <SidebarMobileContext.Provider
            value={[isActiveSidebarMobile, setActiveSidebarMobile]}
        >
            <Box {...defaultLayoutBoxProps}>
                <Flex {...defaultLayoutFlexProps}>{props.children}</Flex>
            </Box>
        </SidebarMobileContext.Provider>
    );
}
