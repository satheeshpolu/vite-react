import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
//   const query = req.query.q || "ai";
  const apiKey = process.env.NEWS_API_KEY;

  //   const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  const url = `https://newsapi.org/v2/everything?q=Apple&from=2025-07-01&sortBy=popularity&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}





// import type { VercelRequest, VercelResponse } from "@vercel/node";

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   // Only allow GET requests
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const apiKey = process.env.NEWS_API_KEY;
//   console.log('NEWS_API_KEY => ', apiKey);
//   // Check if API key exists
//   if (!apiKey) {
//     return res.status(500).json({ error: 'News API key not configured' });
//   }

//   // Get query parameters with defaults
//   const query = req.query.q || "Apple";
//   const from = req.query.from || "2025-07-01";
//   const sortBy = req.query.sortBy || "popularity";

//   try {
//     const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=${sortBy}&apiKey=${apiKey}`;
    
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error(`NewsAPI responded with status: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     // Set CORS headers if needed for frontend requests
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     res.status(500).json({ error: 'Failed to fetch news' });
//   }
// }