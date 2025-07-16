// pages/BlogPost.tsx
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  return <p>Viewing blog post with ID: {id}</p>;
}
