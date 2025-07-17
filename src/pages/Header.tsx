import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useMatch } from "react-router-dom";

const Links = [
  { name: "Home", to: "/" },
  { name: "Blogs", to: "/blogs" },
  { name: "Contact", to: "/contact" },
  { name: "Cart", to: "/cart" },
];

// ✅ This component renders a single nav link with active styling
const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const match = useMatch(to); // Check if current path matches

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
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#e5e7eb';
        e.currentTarget.style.color = '#0d9488';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = match ? '#f3f4f6' : 'transparent';
        e.currentTarget.style.color = match ? '#0d9488' : '#374151';
      }}
    >
      {children}
    </RouterLink>
  );
};

export default function Header() {
  return (
    <Box
      bg="#d0cccc26"
      px={4}
      shadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="xl" color="teal.500">
          MyLogo
        </Text>

        <IconButton size="md" aria-label="Open Menu" display={{ md: "none" }} />

        {/* Desktop nav */}
        <HStack display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.name}
            </NavLink>
          ))}
        </HStack>
      </Flex>

      {/* Mobile nav (optional toggle) */}
      <Box pb={4} display={{ md: "none" }}>
        <Stack as="nav">
          {Links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.name}
            </NavLink>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}