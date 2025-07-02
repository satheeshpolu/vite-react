import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Define allowed keys
type MenuKey = 'dashboard' | 'profile' | 'settings';

// Item structure
interface Item {
  id: number;
  title: string;
  detail: string;
}

// Menu item structure with MenuKey
interface MenuItem {
  id: MenuKey;
  label: string;
}

// Menu items with typed keys
const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
];

// Static data per menu category
const contentData: Record<MenuKey, Item[]> = {
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
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>(menuItems[0]);
  const [selectedItem, setSelectedItem] = useState<Item>(contentData.dashboard[0]);
  const [items, setItems] = useState<Item[]>([]);

  // Load items when selectedMenu changes
  useEffect(() => {
    setItems(contentData[selectedMenu.id]);
    setSelectedItem(contentData[selectedMenu.id][0]); // optional: auto-select first item
  }, [selectedMenu]);

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

        <VStack>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={selectedMenu.id === item.id ? "solid" : "ghost"}
              colorScheme="teal"
              color={selectedMenu.id === item.id ? "#3b82f6" : "gray.700"}
              onClick={() => setSelectedMenu(item)}
              justifyContent="center"
            >
              {item.label}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* Right Content Area: Two Columns */}
      <Flex flex="1" p={6} gap={6}>
        {/* Left: Item List */}
        <Box width="300px" bg="#a3cfff" p={4} borderRadius="md" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {selectedMenu.label}
          </Text>
          <VStack>
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

        {/* Right: Detail View */}
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
