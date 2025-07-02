import { Avatar, Button, Card } from "@chakra-ui/react";

type UCardProps = {
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  onClick: () => void;
};

const UCard = ({ author, title, description, urlToImage, onClick }: UCardProps) => {
  return (
    <Card.Root width="350px" mb="8px" onClick={() => onClick()}>
      <Card.Body>
        <Avatar.Root size="lg" shape="rounded">
          <Avatar.Image src={urlToImage} />
          <Avatar.Fallback name="Nue Camp" />
        </Avatar.Root>
        <Card.Title mb="2">
          {title} - {author}
        </Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default UCard;
