import { useUser } from '@clerk/clerk-react'

export default function Settings() {
  const { user } = useUser()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">
        Manage your account settings and preferences.
      </p>
      
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-gray-900">{user?.fullName || 'Not set'}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Default Jurisdiction</h2>
          <select className="input max-w-md">
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            {/* Add all states */}
          </select>
        </div>
      </div>
    </div>
  )
}
