// Import necessary libraries and styles
import { useState } from 'react'; // Importing the useState hook from React
import { useRouter } from 'next/router'; // Importing the useRouter hook from Next.js
import styles from '../styles/Login.module.css'; // Importing CSS styles
import Head from 'next/head'; // Importing the Head component from Next.js

export default function Login() {
  // Initialize state variables for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize the router hook for route management

  // Handle form submission when the user attempts to log in
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(''); // Clear any previous error messages

    try {
      // Send a POST request to the login API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/firedep/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send the username and password as JSON data
      });

      const data = await response.json(); // Parse the response JSON data

      if (response.ok) {
        // If the response is successful (HTTP status 200), store the token in session storage
        sessionStorage.setItem('token', data.token);
        // Redirect to the admin page upon successful login
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed'); // Display an error message from the response data
      }
    } catch (error) {
      setError('Failed to connect to the server'); // Handle any network or server connection errors
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        {error && <p className={styles.error}>{error}</p>} {/* Display error message if there is an error */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update the username state on input change
          placeholder="Username"
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update the password state on input change
          placeholder="Password"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button> {/* Submit button to trigger the login process */}
      </form>
    </div>
  );
}
