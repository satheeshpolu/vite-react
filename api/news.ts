import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = req.query.q || "ai";
  const apiKey = process.env.NEWS_API_KEY;

  //   const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  const url = `https://newsapi.org/v2/everything?q=Apple&from=2025-07-01&sortBy=popularity&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
