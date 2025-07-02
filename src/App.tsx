import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  HStack,
  useColorModeValue,
  List,
  ListItem,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
];

// Mock data per menu item
const contentData = {
  dashboard: [
    { id: 1, title: "Sales Report", detail: "Detailed sales analysis for Q2." },
    { id: 2, title: "User Growth", detail: "User growth increased by 20%." },
  ],
  profile: [
    { id: 1, title: "John Doe", detail: "Email: john@example.com" },
    { id: 2, title: "Jane Smith", detail: "Email: jane@example.com" },
  ],
  settings: [
    { id: 1, title: "Privacy", detail: "Manage your privacy preferences." },
    { id: 2, title: "Notifications", detail: "Control email and push alerts." },
  ],
};

function App() {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = contentData[selectedMenu.id] || [];

  return (
    <Flex height="100vh" bg="gray.50">
      {/* Left Sidebar */}
      <Box width="250px" bg="#101f47" p={4} boxShadow="md">
        <Box mb={6}>
          <Flex align="center" justify="center" mb={6} height="60px">
            <Heading color="#facc15">U App</Heading>
          </Flex>
          <hr />
        </Box>

        <VStack spacing={4} align="stretch">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={selectedMenu.id === item.id ? "solid" : "ghost"}
              colorScheme="teal"
              color={selectedMenu.id === item.id ? "#3b82f6" : "gray.700"}
              onClick={() => {
                setSelectedMenu(item);
                setSelectedItem(null); // reset selected item
              }}
              justifyContent="center"
            >
              {item.label}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* Right Content Area: Two Columns */}
      <Flex flex="1" p={6} gap={6}>
        {/* Left: Item List - Fixed width */}
        <Box width="300px" bg="#a3cfff" p={4} borderRadius="md" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {selectedMenu.label} Items
          </Text>
          <VStack spacing={3} align="stretch">
            {items.map((item) => (
              <Button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                justifyContent="flex-start"
                variant="outline"
                colorScheme="teal"
              >
                {item.title}
              </Button>
            ))}
          </VStack>
        </Box>

        {/* Right: Detail View - Fixed width */}
        <Box width="600px" bg="white" p={4} borderRadius="md" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {selectedItem ? selectedItem.title : "Select an item"}
          </Text>
          <Text>
            {selectedItem
              ? selectedItem.detail
              : "Details will appear here once you select an item from the list."}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default App;
