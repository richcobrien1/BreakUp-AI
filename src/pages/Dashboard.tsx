import { useUser } from '@clerk/clerk-react'
import { Scale, TrendingUp, FileText, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const { user } = useUser()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName || user?.username}
        </h1>
        <p className="text-gray-600 mt-2">
          Your legal rights education dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Scale className="w-8 h-8 text-primary-500" />}
          title="Queries Asked"
          value="0"
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-green-500" />}
          title="Knowledge Gained"
          value="Getting Started"
        />
        <StatCard
          icon={<FileText className="w-8 h-8 text-blue-500" />}
          title="Documents Saved"
          value="0"
        />
        <StatCard
          icon={<AlertCircle className="w-8 h-8 text-orange-500" />}
          title="Action Items"
          value="0"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <QuickActionButton
            title="Ask a Legal Question"
            description="Get state-specific legal answers"
            href="/legal-query"
          />
          <QuickActionButton
            title="Compare States"
            description="See how laws differ across jurisdictions"
            href="/compare-states"
          />
          <QuickActionButton
            title="Evidence Checklist"
            description="Learn what evidence you need"
            href="/evidence"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-gray-500">
          <p>No recent activity yet. Start exploring to see your history here.</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

function QuickActionButton({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a
      href={href}
      className="block p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
    >
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  )
}
