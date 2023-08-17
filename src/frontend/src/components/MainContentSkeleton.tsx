import {
    Stack,
    StackProps,
    SkeletonText,
    SkeletonCircle,
    HStack,
} from '@chakra-ui/react';

export function MainContentSkeleton() {
    const mainContentDefaultStackProps: StackProps = {
        spacing: 10,
    };

    return (
        <Stack {...mainContentDefaultStackProps}>
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
}
