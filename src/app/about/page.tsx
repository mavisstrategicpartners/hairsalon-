import { Card, CardContent } from '@/components/ui/card'
import { Heart, Award, Users, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Bianca's Hair</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted destination for premium quality wigs and hair extensions in South Africa.
        </p>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl mx-auto mb-16">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Bianca's Hair was founded with a simple mission: to provide South African women with access to 
              premium quality wigs and hair extensions at affordable prices. We understand that your hair is 
              your crown, and we're committed to helping you look and feel your absolute best.
            </p>
            <p className="text-gray-600 mb-4">
              With years of experience in the hair industry, we carefully curate our collection to ensure 
              every product meets our high standards for quality, durability, and style. From bob wigs to 
              long flowing units, from straight to curly textures, we have something for everyone.
            </p>
            <p className="text-gray-600">
              We believe that beautiful hair should be accessible to everyone. That's why we offer competitive 
              pricing, nationwide shipping, and expert customer support to help you find the perfect product 
              for your needs.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2">Quality First</h3>
              <p className="text-sm text-gray-600">
                We only source 100% human hair and premium synthetic fibers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2">Expert Curation</h3>
              <p className="text-sm text-gray-600">
                Every product is hand-selected for quality and style.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2">Customer Focus</h3>
              <p className="text-sm text-gray-600">
                Your satisfaction is our top priority.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2">Affordable Luxury</h3>
              <p className="text-sm text-gray-600">
                Premium quality at competitive prices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Why Choose Bianca's Hair?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                <span className="text-gray-600">
                  <strong>100% Human Hair:</strong> Our wigs and bundles are made with premium human hair for a natural look and feel.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                <span className="text-gray-600">
                  <strong>Nationwide Delivery:</strong> We ship to all major cities and towns across South Africa.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                <span className="text-gray-600">
                  <strong>Expert Support:</strong> Our team is here to help you choose the perfect product and provide styling tips.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                <span className="text-gray-600">
                  <strong>Competitive Pricing:</strong> Premium quality doesn't have to break the bank.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                <span className="text-gray-600">
                  <strong>Wide Selection:</strong> From bobs to long units, straight to curly, we have it all.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
