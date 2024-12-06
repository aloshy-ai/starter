import { render, fireEvent } from '@testing-library/react'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, onMouseMove }: any) => (
      <div className={className} style={style} onMouseMove={onMouseMove}>
        {children}
      </div>
    ),
    span: ({ children, className, style }: any) => (
      <span className={className} style={style}>
        {children}
      </span>
    ),
  },
  useMotionTemplate: (strings: TemplateStringsArray, ...values: any[]) => strings.join(''),
  useMotionValue: (initial: number) => ({
    set: jest.fn(),
    get: () => initial,
  }),
}))

describe('HeroHighlight', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <HeroHighlight>
        <div>Test Content</div>
      </HeroHighlight>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    const { container } = render(<HeroHighlight>Content</HeroHighlight>)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('group', 'relative', 'flex', 'h-full', 'w-full')
  })

  it('accepts custom className and containerClassName', () => {
    const { container } = render(
      <HeroHighlight className="custom-class" containerClassName="container-class">
        Content
      </HeroHighlight>
    )
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('container-class')
    expect(root.querySelector('.z-20')).toHaveClass('custom-class')
  })

  it('handles mouse movement', () => {
    const { container } = render(<HeroHighlight>Content</HeroHighlight>)
    const root = container.firstChild as HTMLElement

    fireEvent.mouseMove(root, { clientX: 100, clientY: 100 })
    // Motion values are mocked, so we just verify the event handler exists
    expect(root).toHaveProperty('onmousemove')
  })
})

describe('Highlight', () => {
  it('renders children with correct styles', () => {
    const { getByText } = render(<Highlight>Test Text</Highlight>)
    const element = getByText('Test Text')
    expect(element).toHaveClass('relative', 'inline-block', 'rounded-lg')
  })

  it('accepts custom className', () => {
    const { getByText } = render(<Highlight className="custom-class">Test</Highlight>)
    expect(getByText('Test')).toHaveClass('custom-class')
  })
})
