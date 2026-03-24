import { Button, HStack, Flex } from '@chakra-ui/react';
import { useCartStore } from '@/entities/cart';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { BackButton } from '@/shared/ui/back-button';
import { useTranslation } from 'react-i18next';
import { CartTable } from '@/widgets/cart-table';

const CartOverview = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const { t } = useTranslation();
  const { items, getTotal } = useCartStore();

  useEffect(() => {
    setIsCartEmpty(!items?.length);
  }, [items]);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const totalAmount = getTotal() || 0;

  return (
    <>
      <Flex justify="flex-end" mt={4} mr={4} align="center" gap={4}>
        {!isCartEmpty && (
          <HStack>
            <Button
              variant="outline"
              bg="#14b8a6"
              color="#c9f9f4"
              _hover={{ bg: 'teal.600' }}
              onClick={() => {
                clearCart();
                navigate('/');
              }}
            >
              {t('cart.clearCart')}
            </Button>
            <Button
              variant="outline"
              bg="#14b8a6"
              color="#c9f9f4"
              _hover={{ bg: 'teal.600' }}
              onClick={() =>
                navigate('/cart/checkout', {
                  state: {
                    user: 'Test User',
                    amount: totalAmount,
                  },
                })
              }
            >
              {t('cart.checkOut')}
            </Button>
            <BackButton />
          </HStack>
        )}
      </Flex>
      <CartTable />
    </>
  );
};

export default CartOverview;
