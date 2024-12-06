import { render } from '@testing-library/react'
import { FadeInOut } from '@/components/layout/fade-in-out'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, exit, transition }: any) => (
      <div
        data-testid="motion-div"
        className={className}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        data-exit={JSON.stringify(exit)}
        data-transition={JSON.stringify(transition)}
      >
        {children}
      </div>
    ),
  },
}))

describe('FadeInOut', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<FadeInOut>Test Content</FadeInOut>)
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { getByTestId } = render(<FadeInOut className="custom-class">Content</FadeInOut>)
    expect(getByTestId('motion-div')).toHaveClass('custom-class')
  })

  it('has correct animation properties', () => {
    const { getByTestId } = render(<FadeInOut>Content</FadeInOut>)
    const motionDiv = getByTestId('motion-div')

    const initial = JSON.parse(motionDiv.getAttribute('data-initial') || '{}')
    const animate = JSON.parse(motionDiv.getAttribute('data-animate') || '{}')
    const exit = JSON.parse(motionDiv.getAttribute('data-exit') || '{}')
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}')

    expect(initial).toEqual({ opacity: 0 })
    expect(animate).toEqual({ opacity: 1 })
    expect(exit).toEqual({ opacity: 0 })
    expect(transition).toEqual({ duration: 1 })
  })
})
