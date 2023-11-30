import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Check if there is no token and redirect to login
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Admin Page</h1>
      {/* Admin page content goes here */}
    </div>
  );
}
