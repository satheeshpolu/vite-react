import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import useCartStore from '../stores/useCartStore';
import { Table, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import ZoomingCart from '@/components/ZoomingCart';
import { BackButton } from '@/components/shared';
import { useTranslation } from 'react-i18next';
import { CartItem } from '@/entities/cart/model/cart.types';

const CartOverview = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const { t } = useTranslation();
  const { items, getTotal, removeItem } = useCartStore();

  // console.log(items);
  // const cart = useCartStore((state: { cart: any }) => state.cart);
  useEffect(() => {
    setIsCartEmpty(!items?.length);
  }, [items]);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  // const [amount, setAmount] = useState(0);
  // Calculate totals
  const totalQuantity = items?.length || 0;
  const totalAmount = getTotal() || 0;

  // const totalDiscounted = cart.reduce(
  //   (acc: number, item: Product) => acc + item.discountPercentage,
  //   0
  // );

  return (
    <>
      <Flex justify="flex-end" mt={4} mr={4} gap={8}>
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
      <Flex style={{ margin: '30px' }}>
        {isCartEmpty && (
          <Box
            flex={1}
            // bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRightRadius={{ md: '80px' }}
          >
            <VStack textAlign="center" px={4}>
              <Heading fontSize={{ base: '3xl', md: '4xl' }}>{'Cart is empty'}</Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} maxW="md">
                {'- Please add items'}
              </Text>
              <ZoomingCart />
            </VStack>
          </Box>
        )}
        {!isCartEmpty && (
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>{t('cart.details.header')}</Table.ColumnHeader>
                <Table.ColumnHeader>{t('cart.details.title')}</Table.ColumnHeader>
                <Table.ColumnHeader>{t('cart.details.quantity')}</Table.ColumnHeader>
                <Table.ColumnHeader>{t('cart.details.total')}</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  {t('cart.details.discount')}
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items?.map((item: CartItem) => (
                <Table.Row key={item.id}>
                  <Table.Cell width={450}>
                    <HStack>
                      <Image
                        src={item?.thumbnail}
                        alt={item?.title}
                        w="200px"
                        h="200px"
                        onClick={() =>
                          navigate(`/category/${item.category}/${item.id}/product_details`, {
                            state: { data: item },
                          })
                        }
                        cursor={'pointer'}
                      />
                      <Button
                        variant="outline"
                        fontSize={8}
                        color="red"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete?')) {
                            removeItem(item.id);
                          }
                        }}
                      >
                        <FaTrash />
                      </Button>
                      <Button
                        variant={'outline'}
                        fontSize={16}
                        color={'#009688'}
                        onClick={() => window.alert("It's under development.")}
                      >
                        <FaPlus />
                      </Button>
                      <Button
                        variant={'outline'}
                        fontSize={16}
                        color={'red'}
                        onClick={() => window.alert("It's under development.")}
                      >
                        <FaMinus />
                      </Button>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                  <Table.Cell textAlign="end">{item.price}</Table.Cell>
                </Table.Row>
              ))}
              <Table.Row fontWeight="bold" bg="gray.300">
                <Table.Cell> {t('cart.details.total')}:</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>{totalQuantity}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell textAlign="end">${totalAmount.toFixed(2)}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        )}
      </Flex>
    </>
  );
};

export default CartOverview;
