'use client'

import { Octokit } from 'octokit'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface Repository {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
}

interface RepositoryListProps {
  className?: string
}

export function RepositoryList({ className }: RepositoryListProps) {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Get the session which contains the provider token
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session?.provider_token) {
          throw new Error('No GitHub access token found')
        }

        const octokit = new Octokit({
          auth: session.provider_token,
        })

        const response = await octokit.rest.repos.listForAuthenticatedUser({
          sort: 'updated',
          per_page: 100,
          visibility: 'all',
        })

        setRepos(response.data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories')
        setLoading(false)
      }
    }

    fetchRepos()
  }, [supabase])

  if (loading) {
    return <div>Loading repositories...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className={cn('grid gap-4', className)}>
      {repos.map((repo) => (
        <div key={repo.id} className="rounded-lg border p-4 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold hover:underline"
            >
              {repo.full_name}
            </a>
            <span className="flex items-center gap-2">
              {repo.private ? (
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">Private</span>
              ) : (
                <span className="rounded bg-green-100 px-2 py-1 text-xs">Public</span>
              )}
              <span className="flex items-center gap-1">⭐ {repo.stargazers_count}</span>
            </span>
          </div>

          {repo.description && <p className="mt-2 text-gray-600">{repo.description}</p>}

          {repo.language && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">{repo.language}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
