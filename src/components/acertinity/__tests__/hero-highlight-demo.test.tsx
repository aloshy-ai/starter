import { render } from '@testing-library/react'
import { HeroHighlightDemo } from '@/components/acertinity/hero-highlight-demo'

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
  },
}))

// Mock the HeroHighlight and Highlight components
jest.mock('@/components/ui/hero-highlight', () => ({
  HeroHighlight: ({ children }: any) => <div data-testid="hero-highlight">{children}</div>,
  Highlight: ({ children, className }: any) => (
    <span data-testid="highlight" className={className}>
      {children}
    </span>
  ),
}))

describe('HeroHighlightDemo', () => {
  it('renders the main text content', () => {
    const { getByText } = render(<HeroHighlightDemo />)
    expect(getByText(/With insomnia, nothing's real/)).toBeInTheDocument()
  })

  it('renders the highlighted text', () => {
    const { getByTestId } = render(<HeroHighlightDemo />)
    const highlight = getByTestId('highlight')
    expect(highlight).toHaveTextContent('copy, of a copy, of a copy')
    expect(highlight).toHaveClass('text-black dark:text-white')
  })

  it('renders within HeroHighlight wrapper', () => {
    const { getByTestId } = render(<HeroHighlightDemo />)
    expect(getByTestId('hero-highlight')).toBeInTheDocument()
  })

  it('applies correct text styling', () => {
    const { container } = render(<HeroHighlightDemo />)
    const h1 = container.querySelector('h1')
    expect(h1).toHaveClass(
      'mx-auto',
      'max-w-4xl',
      'px-4',
      'text-center',
      'text-2xl',
      'font-bold',
      'leading-relaxed',
      'text-neutral-700',
      'dark:text-white',
      'md:text-4xl',
      'lg:text-5xl',
      'lg:leading-snug'
    )
  })
})
