import { Table } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { HStack, Text, Image, IconButton } from '@chakra-ui/react';
import useCartStore from '@/stores/useCartStore';
import { CartItem } from '@/entities/cart/model';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { EmptyState } from './shared/empty/EmptyState';
import ZoomingCart from './ZoomingCart';

const CartTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, getTotal, removeItem, updateQuantity } = useCartStore();
  const totalQuantity = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      {items.length === 0 && (
        <>
          <EmptyState type={'cart'} showBackButton={true} />
          <ZoomingCart />
        </>
      )}
      {items.length != 0 && (
        <Table.Root size="md">
          <Table.Caption captionSide="top" mb={4}>
            <Text fontWeight="bold" fontSize="x-large" minW="32px" textAlign="center">
              Cart Items
            </Text>
          </Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader fontSize="md">Product</Table.ColumnHeader>
              <Table.ColumnHeader fontSize="md">Title</Table.ColumnHeader>
              <Table.ColumnHeader fontSize="md" textAlign="center">
                Price
              </Table.ColumnHeader>
              <Table.ColumnHeader fontSize="md" textAlign="center">
                Quantity
              </Table.ColumnHeader>
              <Table.ColumnHeader fontSize="md">Actions</Table.ColumnHeader>
              <Table.ColumnHeader fontSize="md" textAlign="center">
                Total
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items?.map((item: CartItem) => {
              const discounted = item.discountPercentage
                ? item.price * (1 - item.discountPercentage / 100)
                : item.price;
              return (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <Image
                      src={item?.thumbnail}
                      alt={item?.title}
                      w="80px"
                      h="80px"
                      objectFit="cover"
                      borderRadius="md"
                      boxShadow="md"
                      cursor="pointer"
                      onClick={() =>
                        navigate(`/category/${item.category}/${item.id}/product_details`, {
                          state: { data: item },
                        })
                      }
                    />
                  </Table.Cell>
                  <Table.Cell fontWeight="bold" fontSize="md">
                    <Text fontWeight="bold" fontSize="md">
                      {item.title}
                    </Text>
                    {item.discountPercentage && (
                      <Text color="red.400" fontSize="sm" textDecoration="line-through">
                        ${item.price.toFixed(2)}
                      </Text>
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="center">${discounted.toFixed(2)}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <HStack justify="center">
                      <IconButton
                        aria-label="Decrease"
                        colorScheme="teal"
                        variant="ghost"
                        disabled={item.quantity <= 1}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        size="sm"
                      >
                        <FaMinus color="red" />
                      </IconButton>
                      <Text fontWeight="bold" fontSize="md" minW="32px" textAlign="center">
                        {item.quantity}
                      </Text>

                      {/* <Tooltip label="Increase quantity"> */}
                      <IconButton
                        aria-label="Increase"
                        colorScheme="teal"
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FaPlus color="green" />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <IconButton
                      aria-label="Remove"
                      colorScheme="teal"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete?')) {
                          removeItem(item.id);
                        }
                      }}
                    >
                      <FaTrash color="red" />
                    </IconButton>
                  </Table.Cell>
                  <Table.Cell textAlign="center" fontWeight="bold">
                    ${(discounted * item.quantity).toFixed(2)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row style={{ background: '#f7fafc' }}>
              <Table.Cell colSpan={2} fontWeight="bold" fontSize={16}>
                {t('cart.details.total', 'Total')}
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell textAlign="center" fontWeight="bold">
                {totalQuantity}
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell textAlign="center" fontWeight="bold" color="#319795" fontSize={16}>
                ${getTotal()?.toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      )}
    </>
  );
};

export default CartTable;
