export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
      <p className="mt-2 text-gray-700">
        Welcome, Admin! Manage users and system settings here.
      </p>

      <div className="mt-6 space-y-4">
        <a
          href="/admin/users"
          className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Manage Users
        </a>
        <a
          href="/admin/users/create"
          className="block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create New User
        </a>
      </div>
    </div>
  );
}
