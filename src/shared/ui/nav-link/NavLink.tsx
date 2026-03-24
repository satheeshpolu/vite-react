import { Link as RouterLink, useMatch } from 'react-router-dom';
import { Text, Flex } from '@chakra-ui/react';
import React from 'react';

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  isCart?: boolean;
  CartBadge?: React.ReactNode;
};

export const NavLink = ({ to, children, isCart, CartBadge }: NavLinkProps) => {
  const match = useMatch(to);

  return (
    <RouterLink
      to={to}
      style={{
        padding: '0.5rem 0.75rem',
        borderRadius: '0.375rem',
        fontWeight: match ? 'bold' : 'normal',
        color: match ? '#0d9488' : '#374151',
        backgroundColor: match ? '#f3f4f6' : 'transparent',
        textDecoration: 'none',
        display: 'block',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!match) {
          e.currentTarget.style.backgroundColor = '#84d3cd';
          e.currentTarget.style.color = '#0d9488';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = match ? '#f3f4f6' : 'transparent';
        e.currentTarget.style.color = match ? '#0d9488' : '#374151';
      }}
    >
      <Flex align="center" gap={2} position="relative">
        {isCart && CartBadge}
        <Text>{children}</Text>
      </Flex>
    </RouterLink>
  );
};
