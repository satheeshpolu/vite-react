import { Button } from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const BackButtonComponent = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} colorScheme="teal" variant="outline">
      <FaChevronLeft />
    </Button>
  );
};

export const BackButton = memo(BackButtonComponent);
