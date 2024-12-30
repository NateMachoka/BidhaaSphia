'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { FormInput } from "../components/ui/form-input"
import { Alert, AlertDescription } from "../components/ui/alert"
import Link from 'next/link'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in both fields')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        router.push('/dashboard')
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    }
  }

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
  )
}
