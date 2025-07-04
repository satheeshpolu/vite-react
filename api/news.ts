import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // const query = req.query.q || "ai";
  const apiKey = process.env.NEWS_API_KEY;

  //   const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  const url = `https://newsapi.org/v2/everything?q=Apple&from=2025-07-01&sortBy=popularity&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
// import type { VercelRequest, VercelResponse } from "@vercel/node";

// export default async function handler(req: VercelRequest, res: VercelResponse) {
// //   const query = req.query.q || "ai";
//   const apiKey = process.env.NEWS_API_KEY;

//   //   const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
//   const url = `https://newsapi.org/v2/everything?q=Apple&from=2025-07-01&sortBy=popularity&apiKey=${apiKey}`;

//   const response = await fetch(url);
//   const data = await response.json();

//   res.status(200).json(data);
// }



// import type { VercelRequest, VercelResponse } from "@vercel/node";

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   // Only allow GET requests
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const apiKey = process.env.NEWS_API_KEY;

//   // Don't proceed if API key is missing
//   if (!apiKey) {
//     return res.status(500).json({ error: 'News API key not configured' });
//   }

//   // Extract query parameters with fallbacks
//   const { q = "Apple", from = "2025-07-01", sortBy = "popularity" } = req.query;

//   // Construct URL to NewsAPI
//   const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
//     q as string
//   )}&from=${encodeURIComponent(from as string)}&sortBy=${encodeURIComponent(
//     sortBy as string
//   )}&apiKey=${apiKey}`;

//   // Optional: Set a timeout (good practice with external APIs)
//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), 8000); // 8 seconds

//   try {
//     const response = await fetch(url, { signal: controller.signal });

//     if (!response.ok) {
//       throw new Error(`NewsAPI responded with status: ${response.status}`);
//     }

//     const data = await response.json();

//     // Optional: Add CORS headers for local dev if needed
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     res.status(500).json({ error: 'Failed to fetch news' });
//   } finally {
//     clearTimeout(timeout);
//   }
// }
