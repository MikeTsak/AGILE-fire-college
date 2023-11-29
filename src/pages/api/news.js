// pages/api/news.js

export default async function handler(req, res) {
    try {
      const apiResponse = await fetch('http://localhost:8080/firedep/news');
      const data = await apiResponse.json();
  
      // Assuming the response is an array of news items
      if (apiResponse.ok && Array.isArray(data)) {
        res.status(200).json(data);
      } else {
        // Handle any errors from the external API
        res.status(apiResponse.status).json({ message: 'Failed to fetch news by next API' });
      }
    } catch (error) {
      // Handle the error if the external API call fails
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
  