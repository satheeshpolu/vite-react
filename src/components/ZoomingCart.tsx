import { FaOpencart } from 'react-icons/fa';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; // ✅ Correct import

// Future usage: Define the zoom animation
const zoomAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
`;

export default function ZoomingCart() {
  return (
    <>
      {/* <Box animation={`${zoomAnimation} 2s ease-in-out infinite`} display="inline-block">
        <FaOpencart size={200} color="rgba(32, 134, 125, 1)" />
      </Box> */}
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
