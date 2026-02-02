// FeatureCard.tsx
interface FeatureCardProps {
  title: string
  description: string
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div
      className="
        bg-white/80 backdrop-blur-md
        rounded-2xl p-8
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-1
        border border-white/40
      "
    >
      <h4 className="text-xl font-semibold text-blue-700 mb-3">
        {title}
      </h4>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-blue-400">
            NepaLink
          </h1>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="hover:text-blue-400 transition">Features</a>
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            <a href="/login" className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-md transition">Login</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-slate-900 to-black" />
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Care That Feels
            <span className="block text-blue-400"> Truly Connected</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-lg text-gray-300">
            A secure digital bridge between families and verified caregivers.
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <a href="/register" className="px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30 transition">Get Started</a>
            <a href="#features" className="px-10 py-4 rounded-full border border-white/30 text-white backdrop-blur-md hover:bg-white/10 transition">Explore Features</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-28 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4">Why NepaLink?</h3>
          <p className="text-gray-400 mb-20 max-w-2xl mx-auto">
            Designed for trust, security, and long-term care relationships.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard title="Smart Matching" description="Data-driven caregiver selection tailored to family needs." />
            <FeatureCard title="Secure Communication" description="Encrypted messaging with transparent activity updates." />
            <FeatureCard title="Verified Profiles" description="Identity and background verification for accountability." />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-20">Trusted by the Community</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <blockquote className="bg-white/5 p-10 rounded-2xl border border-white/10">
              <p className="italic text-gray-300">“NepaLink gave me peace of mind even from abroad.”</p>
              <footer className="mt-6 text-blue-400 font-semibold">— Family Member</footer>
            </blockquote>
            <blockquote className="bg-white/5 p-10 rounded-2xl border border-white/10">
              <p className="italic text-gray-300">“Finally a platform that respects caregivers.”</p>
              <footer className="mt-6 text-blue-400 font-semibold">— Caregiver</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 text-gray-400">
        <div className="max-w-7xl mx-auto text-center px-6">
          <p className="text-sm">© {new Date().getFullYear()} NepaLink. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="#privacy" className="hover:text-white">Privacy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
