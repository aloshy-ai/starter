import { render } from '@testing-library/react'
import { UserInfo } from '@/components/auth/user-info'
import { createServerClient } from '@/lib/supabase/server'

// Mock the Supabase server client
jest.mock('@/lib/supabase/server', () => ({
  createServerClient: jest.fn(),
}))

describe('UserInfo', () => {
  const mockUser = {
    user_metadata: {
      full_name: 'Test User',
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders user name when user is present', async () => {
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: mockUser },
          error: null,
        }),
      },
    }
    ;(createServerClient as jest.Mock).mockResolvedValue(mockSupabase)

    const component = await UserInfo()
    const { getByText } = render(component)

    expect(getByText('Hi Test User')).toBeInTheDocument()
  })

  it('handles error state', async () => {
    const mockError = { message: 'Auth error' }
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: null },
          error: mockError,
        }),
      },
    }
    ;(createServerClient as jest.Mock).mockResolvedValue(mockSupabase)

    const component = await UserInfo()
    const { getByText } = render(component)

    expect(getByText('Error: Auth error')).toBeInTheDocument()
  })

  it('handles no user state', async () => {
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: null },
          error: null,
        }),
      },
    }
    ;(createServerClient as jest.Mock).mockResolvedValue(mockSupabase)

    const component = await UserInfo()
    const { getByText } = render(component)

    expect(getByText('No user found')).toBeInTheDocument()
  })
})
