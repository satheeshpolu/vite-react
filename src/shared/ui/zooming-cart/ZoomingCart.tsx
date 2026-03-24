import { Box } from '@chakra-ui/react';

export function ZoomingCart() {
  return (
    <>
      <Box
        bg="#5ac1b7"
        w="700px"
        h="700px"
        borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
        position="fixed"
        zIndex={0}
      />
    </>
  );
}
