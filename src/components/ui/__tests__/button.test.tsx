import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

// Mock Radix Slot with a simpler implementation
jest.mock('@radix-ui/react-slot', () => ({
  Slot: 'div',
}))

describe('Button Component', () => {
  it('renders with default variant and size', () => {
    const { getByRole } = render(<Button>Click me</Button>)
    const button = getByRole('button')

    // Test default variant classes
    expect(button).toHaveClass(
      'bg-primary',
      'text-primary-foreground',
      'shadow',
      'hover:bg-primary/90'
    )

    // Test default size classes
    expect(button).toHaveClass('h-9', 'px-4', 'py-2')
  })

  it('applies variant classes correctly', () => {
    const { getByRole } = render(<Button variant="destructive">Delete</Button>)
    const button = getByRole('button')
    expect(button).toHaveClass(
      'bg-destructive',
      'text-destructive-foreground',
      'shadow-sm',
      'hover:bg-destructive/90'
    )
  })

  it('applies size classes correctly', () => {
    const { getByRole } = render(<Button size="sm">Small</Button>)
    const button = getByRole('button')
    expect(button).toHaveClass('h-8', 'rounded-md', 'px-3', 'text-xs')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders as child when asChild is true', () => {
    const { container } = render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )

    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/test')
    expect(link?.tagName.toLowerCase()).toBe('a')
  })

  it('applies custom className', () => {
    const { getByRole } = render(<Button className="custom-class">Custom</Button>)
    expect(getByRole('button')).toHaveClass('custom-class')
  })

  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>)
    expect(getByRole('button')).toBeDisabled()
    expect(getByRole('button')).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
  })
})
