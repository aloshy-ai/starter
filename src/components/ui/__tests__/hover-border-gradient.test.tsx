import { render, fireEvent } from '@testing-library/react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, initial, animate, transition }: any) => (
      <div
        data-testid="motion-div"
        className={className}
        style={style}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
      >
        {children}
      </div>
    ),
  },
}))

describe('HoverBorderGradient', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<HoverBorderGradient>Test Content</HoverBorderGradient>)
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    const { container } = render(<HoverBorderGradient>Content</HoverBorderGradient>)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('relative', 'flex', 'h-min', 'w-fit', 'rounded-full', 'border')
  })

  it('accepts custom className and containerClassName', () => {
    const { container } = render(
      <HoverBorderGradient className="custom-class" containerClassName="container-class">
        Content
      </HoverBorderGradient>
    )
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('container-class')
    const content = root.querySelector('.z-10')
    expect(content).toHaveClass('custom-class')
  })

  it('renders as different element when "as" prop is provided', () => {
    const { container } = render(
      <HoverBorderGradient as="div" className="link-class">
        <a href="/test">Link</a>
      </HoverBorderGradient>
    )
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('handles hover states', () => {
    const { container } = render(<HoverBorderGradient>Content</HoverBorderGradient>)
    const root = container.firstChild as HTMLElement

    fireEvent.mouseEnter(root)
    const motionDiv = container.querySelector('[data-testid="motion-div"]')
    expect(motionDiv).toHaveAttribute('data-animate')

    fireEvent.mouseLeave(root)
    expect(motionDiv).toHaveAttribute('data-initial')
  })

  it('respects duration prop', () => {
    const { container } = render(<HoverBorderGradient duration={2}>Content</HoverBorderGradient>)
    const motionDiv = container.querySelector('[data-testid="motion-div"]')
    const transition = JSON.parse(motionDiv?.getAttribute('data-transition') || '{}')
    expect(transition.duration).toBe(2)
  })
})
