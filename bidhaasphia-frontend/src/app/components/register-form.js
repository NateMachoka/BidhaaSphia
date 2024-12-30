'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { FormInput } from "../components/ui/form-input"
import { Alert, AlertDescription } from "../components/ui/alert"
import Link from 'next/link'

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name || !email || !password || !phoneNumber) {
      setError('All fields are required')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    if (!/^\d+$/.test(phoneNumber)) {
      setError('Phone number should contain only digits')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phoneNumber }),
      })
      const data = await response.json()

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...')
        setTimeout(() => router.push('/login'), 2000)
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <FormInput
        label="Full Name"
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <FormInput
        label="Phone Number"
        id="phoneNumber"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full">Register</Button>
      <p className="text-center mt-4">
        Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
      </p>
    </form>
  )
}
