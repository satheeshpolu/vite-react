import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BackButton } from '../navigation/BackButton';

type EmptyStateProps = {
  type: string;
  showBackButton?: boolean;
};
export function EmptyState({ type, showBackButton = false }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <Flex justify="center" align="center" minH="60vh">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRightRadius={{ md: '80px' }}
        px={4}
        py={8}
        bg="#8ef1e4"
      >
        <VStack textAlign="center">
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>{t(`${type}.emptyState.title`)}</Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} maxW="md">
            {t(`${type}.emptyState.description`)}
          </Text>
          {showBackButton && <BackButton />}
        </VStack>
      </Box>
    </Flex>
  );
}
