import { HStack, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';

export function LoadingSkeleton() {
  return (
    <Stack gap="6" maxW="xs">
      <HStack width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton height="200px" />
    </Stack>
  );
}
