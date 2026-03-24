import { Text, Spinner, VStack } from '@chakra-ui/react';

interface LoadingTextProps {
  title?: string;
}

export default function LoadingText({ title = 'Loading...' }: LoadingTextProps) {
  return (
    <VStack gap={4}>
      <Spinner size="xl" color="teal.500" borderWidth="4px" />
      <Text fontSize="lg" fontWeight="medium" color="teal.600">
        {title}
      </Text>
    </VStack>
  );
}
