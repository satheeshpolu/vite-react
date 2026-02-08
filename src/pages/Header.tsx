import { Box, Flex, HStack, IconButton, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FaArrowCircleDown, FaArrowCircleUp, FaOpencart } from 'react-icons/fa';
import useCartStore from '@/stores/useCartStore';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { NavLink } from '@/shared/NavLink';

const Links = [
  { name: t('app.navigation.home'), to: '/' },
  { name: t('app.navigation.contact'), to: '/contact' },
  { name: t('app.navigation.wishlist'), to: '/wishlist' },
  { name: t('app.navigation.recentlyViewed'), to: '/recent_products' },
  { name: t('app.navigation.orders'), to: '/orders' },
  { name: t('app.navigation.cart'), to: '/cart' },
];

// Separate component for cart badge to use hooks properly
const CartBadge = () => {
  // Access cart items from the store
  const { items } = useCartStore();
  const cartCount = items?.length || 0;
  if (cartCount === 0) return null;

  return (
    <Box
      position="absolute"
      top="-12px"
      right="-12px"
      bg="#20b3a5"
      color="white"
      fontSize="xs"
      fontWeight="bold"
      px={1.5}
      borderRadius="full"
    >
      {cartCount}
    </Box>
  );
};

export default function Header() {
  const { onOpen, onClose } = useDisclosure();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const opnenMenu = () => {
    setIsOpenMenu(true);
    onOpen();
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
    onClose();
  };

  return (
    <Box
      bg="#d0cccc26"
      px={4}
      shadow="lg"
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(6.3px)"
    >
      <Flex h={24} alignItems="center" justifyContent="space-between" px={4}>
        {/* Logo Section */}
        <Flex align="center" cursor={'pointer'} onClick={() => navigate('/')}>
          <FaOpencart size={96} color="#b8e5e1ff" />
          <Text fontWeight="bold" fontSize="xl" color="rgba(32, 134, 125, 1)" marginLeft={'-95px'}>
            {t('app.title')}
          </Text>
        </Flex>

        {/* Toggle Button (Mobile Only) */}
        <IconButton
          size="md"
          bg="#14b8a6"
          aria-label="Toggle Menu"
          display={{ md: 'none' }}
          onClick={() => (isOpenMenu ? closeMenu() : opnenMenu())}
        >
          {isOpenMenu ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
        </IconButton>

        {/* Desktop Navigation */}
        <HStack display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => {
            const isCart = link.name === 'Cart';
            return (
              <NavLink
                key={link.to}
                to={link.to}
                isCart={isCart}
                CartBadge={isCart ? <CartBadge /> : null}
              >
                {link.name}
              </NavLink>
            );
          })}
        </HStack>
      </Flex>

      {/* Mobile Navigation */}
      {isOpenMenu && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav">
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
