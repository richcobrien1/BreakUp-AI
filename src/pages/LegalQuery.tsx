import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

export default function LegalQuery() {
  const [question, setQuestion] = useState('')
  const [jurisdiction, setJurisdiction] = useState('CA')

  const queryMutation = useMutation({
    mutationFn: (data: { question: string; jurisdiction: string }) =>
      api.post('/legal/query', data),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      queryMutation.mutate({ question, jurisdiction })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Query</h1>
      <p className="text-gray-600 mb-8">
        Ask questions about your legal rights, property division, support, and more.
      </p>

      {/* Query Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your State
            </label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="input"
            >
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              {/* Add all states */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What is community property in California? How is spousal support calculated?"
              rows={4}
              className="input"
            />
          </div>

          <button
            type="submit"
            disabled={queryMutation.isPending || !question.trim()}
            className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {queryMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Searching Legal Database...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Ask Question
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {queryMutation.data && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Answer</h2>
          <div className="prose max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-sm text-blue-900">
                {queryMutation.data.data.results[0]?.plain_language || 
                 queryMutation.data.data.results[0]?.excerpt}
              </p>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-2">Legal References</h3>
            <ul className="space-y-2">
              {queryMutation.data.data.results.map((result: any, idx: number) => (
                <li key={idx} className="text-sm">
                  <strong>{result.title}</strong> - {result.citation}
                </li>
              ))}
            </ul>

            {queryMutation.data.data.procedural_next_steps?.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-2">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-1">
                  {queryMutation.data.data.procedural_next_steps.map((step: string, idx: number) => (
                    <li key={idx} className="text-sm">{step}</li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </div>
      )}

      {queryMutation.isError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-900">
            Error processing your query. Please try again.
          </p>
        </div>
      )}
    </div>
  )
}
