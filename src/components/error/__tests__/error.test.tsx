import { fireEvent, render } from '@testing-library/react'
import { Error } from '@/components/error'

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
}))

describe('Error Component', () => {
  const mockError = {
    name: 'MockError',
    message: 'Test error message',
    digest: 'error-digest-123',
  }

  it('renders error message', () => {
    const { getByText } = render(<Error error={mockError} />)
    expect(getByText('Test error message')).toBeInTheDocument()
  })

  it('renders default message when no error message provided', () => {
    const { getByText } = render(
      <Error error={{ name: 'Error', message: '', digest: undefined }} />
    )
    expect(getByText('Something went wrong!')).toBeInTheDocument()
  })

  it('renders error digest when provided', () => {
    const { getByText } = render(<Error error={mockError} />)
    expect(getByText('error-digest-123')).toBeInTheDocument()
  })

  it('calls reset function when retry button is clicked', () => {
    const mockReset = jest.fn()
    const { getByText } = render(<Error error={mockError} reset={mockReset} />)

    fireEvent.click(getByText('Retry'))
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('does not render retry button when reset function is not provided', () => {
    const { queryByText } = render(<Error error={mockError} />)
    expect(queryByText('Retry')).not.toBeInTheDocument()
  })
})
