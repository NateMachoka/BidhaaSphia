import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import Link from 'next/link'

export function Banner({ customerLink, professionalLink }) {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold mb-2">For Customers</h3>
            <p className="mb-4">Looking for top-notch professional services? Discover skilled experts ready to bring your projects to life!</p>
            <Button variant="secondary" asChild>
              <Link href="/professional-services">Find Services</Link>
            </Button>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">For Professionals</h3>
            <p className="mb-4">Showcase your talents and connect with clients worldwide. Join our community of skilled professionals today!</p>
            <Button variant="secondary" asChild>
              <Link href="/join-as-professional">Join as a Professional</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
