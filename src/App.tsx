import { Box, Flex, VStack, Text, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UCard from "./components/UCard";
import ArticleCard, { Article } from "./components/ArticleCard";

// Define allowed keys
type MenuKey = "dashboard" | "profile" | "settings" | "news_app";

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
  { id: "news_app", label: "News App" },
];

// Static data per menu category
const contentData: Record<MenuKey, any[]> = {
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
  news_app: [],
};

function App() {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>(menuItems[0]);
  const [selectedItem, setSelectedItem] = useState<Item>(
    contentData.dashboard[0]
  );
  const [items, setItems] = useState<Item[]>([]);
  const [newsData, setNewsData] = useState([]);
  const [loadingNewsData, setLoadingNewsData] = useState(false);
  const [articleData, setArticleData] = useState({
    author: "",
    content: "",
    description: "",
    publishedAt: "",
    source: { id: "", name: "" },
    title: "",
    url: "",
    urlToImage: "",
  });

  const today = new Date();
  today.setDate(today.getDate() - 1); // Subtract one day
  const formattedDate = today.toISOString().split("T")[0];
  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  // Load items when selectedMenu changes
  useEffect(() => {
    setItems(contentData[selectedMenu.id]);
    setSelectedItem(contentData[selectedMenu.id][0]); // optional: auto-select first item
  }, [selectedMenu]);

  useEffect(() => {
    setLoadingNewsData(true);
    fetch(
      `https://newsapi.org/v2/everything?q=Apple&from=${formattedDate}&sortBy=popularity&apiKey=${NEWS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.articles);
        setNewsData(data.articles);
        setLoadingNewsData(false);
      });
  }, []);

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
        <Box
          width="400px"
          bg="#a3cfff"
          p={4}
          borderRadius="md"
          boxShadow="sm"
          overflow="auto"
        >
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
          {selectedMenu.id === "news_app" && loadingNewsData && (
            <p>Loading News Data... </p>
          )}
          {selectedMenu.id === "news_app" &&
            !loadingNewsData &&
            newsData?.map((newsInfo: Article) => (
              <UCard
                key={newsInfo?.title}
                author={newsInfo?.author}
                title={newsInfo?.title}
                description={newsInfo?.description}
                urlToImage={newsInfo?.urlToImage}
                onClick={() => setArticleData(newsInfo)}
              ></UCard>
            ))}
        </Box>

        {/* Right: Detail View */}
        <Box
          width="600px"
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="sm"
          overflow="auto"
        >
          {selectedMenu.id != "news_app" && (
            <>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                {selectedItem ? selectedItem.title : "Select an item"}
              </Text>
              <Text>
                {selectedItem
                  ? selectedItem.detail
                  : "Details will appear here once you select an item from the list."}
              </Text>
            </>
          )}

          {selectedMenu.id === "news_app" && (
            <ArticleCard article={articleData}></ArticleCard>
          )}
        </Box>
        <h1>Ads</h1>
      </Flex>
    </Flex>
  );
}

export default App;
