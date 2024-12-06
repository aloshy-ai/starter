import { render } from '@testing-library/react'
import { Loading } from '@/components/acertinity/loading'

// Mock the FadeInOut component
jest.mock('@/components/layout/fade-in-out', () => ({
  FadeInOut: ({ children, className, 'data-testid': testId }: any) => (
    <div data-testid={testId} className={className}>
      {children}
    </div>
  ),
}))

describe('Loading Component', () => {
  it('renders with default className', () => {
    const { getByTestId } = render(<Loading />)
    const element = getByTestId('loading-animation')
    expect(element).toBeInTheDocument()
  })

  it('accepts and applies custom className', () => {
    const customClass = 'custom-test-class'
    const { getByTestId } = render(<Loading className={customClass} />)
    const element = getByTestId('loading-animation')
    expect(element).toHaveClass(customClass)
  })

  it('renders gradient elements', () => {
    const { getAllByTestId } = render(<Loading />)
    const gradients = getAllByTestId(/gradient-/)
    expect(gradients).toHaveLength(4)
  })
})
