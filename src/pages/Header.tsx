import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  // useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Links = [
  { name: "Home", to: "/" },
  { name: "Blogs", to: "/blogs" },
  { name: "Contact", to: "/contact" },
  { name: "Cart", to: "/cart" },
];

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    as={RouterLink}
    to={to}
    px={3}
    py={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "gray.200",
    }}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="#d0cccc26" px={4} shadow="md" position="sticky" top={0} zIndex={1000}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Text fontWeight="bold" fontSize="xl" color="teal.500">
          MyLogo
        </Text>

        <IconButton
          size={"md"}
          icon={isOpen ? <Text>X</Text> : <Text>XX</Text>}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.name}
            </NavLink>
          ))}
        </HStack>
      </Flex>

      {!isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
