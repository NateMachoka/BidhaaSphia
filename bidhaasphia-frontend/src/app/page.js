import Link from 'next/link';
import { Button } from "./components/ui/button";
import { ShoppingBag, LogIn, UserPlus, Users, CreditCard } from 'lucide-react';
import { FeaturedProducts } from './components/FeaturedProducts';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header with Login/Register */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-600">BidhaaSphia</Link>
          <div className="space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">
                <UserPlus className="mr-2 h-4 w-4" /> Register
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Welcome to BidhaaSphia</h1>
          <p className="text-xl md:text-2xl text-gray-200">Discover amazing products and unbeatable deals!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/login">
                Explore Products <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
              <Link href="/login">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <FeaturedProducts />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BidhaaSphia?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <ShoppingBag className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Wide Selection</h3>
              <p className="text-gray-600">Explore our vast catalog of products from top brands.</p>
            </div>
            <div>
              <Users className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Talent at Your Fingertips</h3>
              <p className="text-gray-600">Connect with skilled professionals for all your service needs.</p>
            </div>
            <div>
              <CreditCard className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Secure Payments</h3>
              <p className="text-gray-600">Shop with confidence using our secure payment methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8">Sign up now and get 10% off your first purchase!</p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/register">
              Sign Up Now <UserPlus className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
