export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {/* Logo / Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-600">NepaLink</h1>
        <p className="text-gray-600 mt-2">
          Connecting caregivers and members with trust and care.
        </p>
      </header>

      {/* Hero Section */}
      <section className="text-center max-w-md mb-12">
        <h2 className="text-2xl font-semibold mb-4">Welcome to NepaLink</h2>
        <p className="text-gray-700">
          A platform designed to help caregivers and members find opportunities,
          share updates, and build meaningful connections.
        </p>
      </section>

      {/* Actions */}
      <div className="flex gap-6">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          Register
        </a>
      </div>
    </main>
  )
}
