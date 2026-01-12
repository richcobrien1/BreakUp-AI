import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { Scale, Shield, BookOpen, FileSearch, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Scale className="w-10 h-10 text-white" />
            <span className="text-2xl font-bold text-white">Breakup-AI</span>
          </div>
          <div className="flex space-x-4">
            <SignInButton mode="modal">
              <button className="px-6 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-6 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            The Civil Rights Gap in Modern Partnerships
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Most spouses are never educated about their legal and financial rights — until it's too late.
          </p>
          <p className="text-lg mb-12 text-white/80 max-w-3xl mx-auto">
            Breakup-AI empowers non-breadwinning spouses with the legal, financial, and strategic knowledge 
            required to protect their future. This is not about heartbreak. This is about justice, compensation, and survival.
          </p>
          <SignUpButton mode="modal">
            <button className="px-8 py-4 bg-white text-primary-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center">
              Start Your Legal Education
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-primary-500" />}
            title="Legal Rights Education"
            description="State-specific legal knowledge at your fingertips"
          />
          <FeatureCard
            icon={<FileSearch className="w-12 h-12 text-primary-500" />}
            title="Evidence Framework"
            description="Understand what evidence you need and how to collect it"
          />
          <FeatureCard
            icon={<BookOpen className="w-12 h-12 text-primary-500" />}
            title="Plain Language Law"
            description="Complex legal concepts translated to 8th grade reading level"
          />
          <FeatureCard
            icon={<Scale className="w-12 h-12 text-primary-500" />}
            title="State Comparison"
            description="Compare laws across jurisdictions to make informed decisions"
          />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">The Core Problem</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. No Education on Civil Rights</h3>
              <p className="text-white/80">
                The partner with less financial power is the partner with the least information.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Economic Dependency Without Protection</h3>
              <p className="text-white/80">
                Unpaid labor has real economic value, but the system rarely teaches people how to claim it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Legal Complexity as a Barrier</h3>
              <p className="text-white/80">
                The legal system is expensive, intimidating, and difficult to navigate without representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-white/60">
        <p>© 2026 Breakup-AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
