import { render } from '@testing-library/react'
import { SignInButton } from '@/components/auth/sign-in-button'

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

describe('SignInButton', () => {
  it('renders with default styling', () => {
    const { getByTestId } = render(<SignInButton />)
    const button = getByTestId('hover-gradient')
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'space-x-2',
      'bg-white',
      'text-lg',
      'font-medium',
      'text-black',
      'dark:bg-black',
      'dark:text-white'
    )
  })

  it('renders GitHub icon', () => {
    const { container } = render(<SignInButton />)
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('width', '40')
  })

  it('renders correct text content', () => {
    const { getByText } = render(<SignInButton />)
    expect(getByText('Sign In with Github')).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-test-class'
    const { getByTestId } = render(<SignInButton className={customClass} />)
    expect(getByTestId('fade-in-out')).toHaveClass(customClass)
  })

  it('links to correct auth route', () => {
    const { container } = render(<SignInButton />)
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/auth/sign-in')
  })
})
