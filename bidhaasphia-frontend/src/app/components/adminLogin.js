import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession(); // Track session state

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else if (res?.status === 200) {
        // Check if the user is an admin after successful login
        if (res?.user?.role === 'admin') {
          router.push('/adminDashboard'); // Redirect to admin dashboard
        } else {
          setError('You are not authorized to access this page');
        }
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  // Optional: Redirect logged-in user to dashboard if session exists
  if (status === 'authenticated' && session?.user?.role === 'admin') {
    router.push('/adminDashboard');
  }

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminLogin;
