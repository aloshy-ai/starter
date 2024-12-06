import { render } from '@testing-library/react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

// Mock Radix UI Avatar components
jest.mock('@radix-ui/react-avatar', () => ({
  Root: ({ children, className }: any) => (
    <div data-testid="avatar-root" className={className}>
      {children}
    </div>
  ),
  Image: ({ src, alt, className }: any) => (
    <img data-testid="avatar-image" src={src} alt={alt} className={className} />
  ),
  Fallback: ({ children, className }: any) => (
    <div data-testid="avatar-fallback" className={className}>
      {children}
    </div>
  ),
}))

// Mock pointer events for Radix UI
function createMockPointerEvent(type: string, props: PointerEventInit = {}): PointerEvent {
  const event = new Event(type, props) as PointerEvent
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? 'mouse',
  })
  return event
}

// Setup global mocks
beforeAll(() => {
  // Mock PointerEvent
  window.PointerEvent = createMockPointerEvent as any

  // Mock HTMLElement methods
  Object.assign(window.HTMLElement.prototype, {
    scrollIntoView: jest.fn(),
    releasePointerCapture: jest.fn(),
    hasPointerCapture: jest.fn(),
  })
})

describe('Avatar Component', () => {
  it('renders with default classes', () => {
    const { getByTestId } = render(<Avatar />)
    const avatar = getByTestId('avatar-root')
    expect(avatar).toHaveClass(
      'relative',
      'flex',
      'h-10',
      'w-10',
      'shrink-0',
      'overflow-hidden',
      'rounded-full'
    )
  })

  it('applies custom className', () => {
    const { getByTestId } = render(<Avatar className="custom-class" />)
    expect(getByTestId('avatar-root')).toHaveClass('custom-class')
  })

  it('renders image with correct props', () => {
    const { getByTestId } = render(
      <AvatarImage src="test.jpg" alt="Test Avatar" className="custom-image" />
    )
    const image = getByTestId('avatar-image')
    expect(image).toHaveAttribute('src', 'test.jpg')
    expect(image).toHaveAttribute('alt', 'Test Avatar')
    expect(image).toHaveClass('aspect-square', 'h-full', 'w-full', 'custom-image')
  })

  it('renders nested components correctly', () => {
    const { getByTestId } = render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" />
      </Avatar>
    )
    expect(getByTestId('avatar-root')).toBeInTheDocument()
    expect(getByTestId('avatar-image')).toBeInTheDocument()
  })
})
