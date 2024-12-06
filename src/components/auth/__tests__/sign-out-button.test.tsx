import { render, waitFor, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { SignOutButton } from '@/components/auth/sign-out-button'
import { createBrowserClient } from '@/lib/supabase/client'

// Mock the Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createBrowserClient: jest.fn(),
}))

// Mock the Loading component
jest.mock('@/components/acertinity/loading', () => ({
  Loading: ({ className }: any) => <div data-testid="loading" className={className} />,
}))

// Mock the FadeInOut component
jest.mock('@/components/layout/fade-in-out', () => ({
  FadeInOut: ({ children, className }: any) => (
    <div data-testid="fade-in-out" className={className}>
      {children}
    </div>
  ),
}))

// Mock the HoverBorderGradient component
jest.mock('@/components/ui/hover-border-gradient', () => ({
  HoverBorderGradient: ({ children, className, containerClassName }: any) => (
    <button data-testid="hover-gradient" className={className}>
      <div className={containerClassName}>{children}</div>
    </button>
  ),
}))

describe('SignOutButton', () => {
  const mockUser = {
    user_metadata: {
      avatar_url: 'https://example.com/avatar.jpg',
      full_name: 'Test User',
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state initially', async () => {
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockImplementation(() => new Promise(() => {})),
      },
    }
    ;(createBrowserClient as jest.Mock).mockReturnValue(mockSupabase)

    const component = render(<SignOutButton />)
    expect(component.getByTestId('loading')).toBeInTheDocument()
  })

  it('renders user info after loading', async () => {
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser }, error: null }),
      },
    }
    ;(createBrowserClient as jest.Mock).mockReturnValue(mockSupabase)

    const component = render(<SignOutButton />)

    await waitFor(() => {
      expect(component.getByText('Sign Out Test User')).toBeInTheDocument()
      expect(component.getByTestId('hover-gradient')).toBeInTheDocument()
    })
  })

  it('applies custom className', async () => {
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser }, error: null }),
      },
    }
    ;(createBrowserClient as jest.Mock).mockReturnValue(mockSupabase)

    const customClass = 'custom-test-class'
    const component = render(<SignOutButton className={customClass} />)

    await waitFor(() => {
      expect(component.getByTestId('fade-in-out')).toHaveClass(customClass)
    })
  })

  it('links to correct sign-out route', async () => {
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser }, error: null }),
      },
    }
    ;(createBrowserClient as jest.Mock).mockReturnValue(mockSupabase)

    const component = render(<SignOutButton />)

    await waitFor(() => {
      const link = component.container.querySelector('a')
      expect(link).toHaveAttribute('href', '/auth/sign-out')
    })
  })

  it('handles error state', async () => {
    // Mock console.error to prevent error logging
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const mockError = { name: 'AuthError', message: 'Auth error' }
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: null },
          error: mockError,
        }),
      },
    }
    ;(createBrowserClient as jest.Mock).mockReturnValue(mockSupabase)

    const component = render(<SignOutButton />)

    // Wait for the error to be thrown and caught
    await waitFor(
      () => {
        expect(component.getByTestId('loading')).toBeInTheDocument()
        expect(consoleSpy).toHaveBeenCalledWith(mockError)
      },
      { timeout: 1000 }
    )

    // Clean up
    consoleSpy.mockRestore()
  })
})
