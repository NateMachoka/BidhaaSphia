import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to BidhaaSphia</h1>
      <p>This is the homepage.</p>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/register">Register</Link>
    </div>
  )
}
