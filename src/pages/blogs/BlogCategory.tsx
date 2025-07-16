// pages/BlogCategory.tsx
import { useParams } from "react-router-dom";

export default function BlogCategory() {
  const { category } = useParams();
  return <p>Category: {category}</p>;
}
