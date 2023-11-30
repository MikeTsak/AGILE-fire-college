export default function handler(req, res) {
    if (req.method === 'POST') {
      const { username, password } = req.body;
      // Authenticate the user here (e.g., check a database)
      // If authentication is successful, create a session/token
      // For demonstration, let's assume authentication is always successful
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      // Handle any other HTTP methods
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  