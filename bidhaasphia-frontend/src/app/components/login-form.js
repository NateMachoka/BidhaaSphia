'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { FormInput } from "../components/ui/form-input"
import { Alert, AlertDescription } from "../components/ui/alert"
import { signIn, getSession } from 'next-auth/react'  // Import getSession here
import Link from 'next/link'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      const session = await getSession(); // Get updated session with the token
      if (session?.accessToken) {
        // Store token if needed
        localStorage.setItem('accessToken', session.accessToken);
      }
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <FormInput
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormInput
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full">Login</Button>
      <p className="text-center mt-4">
        Don't have an account? <Link href="/register" className="text-primary hover:underline">Register</Link>
      </p>
    </form>
  );
}
