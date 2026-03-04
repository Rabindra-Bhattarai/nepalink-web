import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText(/Click Me/i)).toBeInTheDocument()
  })

  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>)
    const button = screen.getByRole('button', { name: /Primary/i })
    expect(button).toHaveClass('bg-blue-600')
  })

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button', { name: /Secondary/i })
    expect(button).toHaveClass('bg-gray-200')
  })

  it('applies danger variant styles', () => {
    render(<Button variant="danger">Danger</Button>)
    const button = screen.getByRole('button', { name: /Danger/i })
    expect(button).toHaveClass('bg-red-600')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click</Button>)
    const button = screen.getByRole('button', { name: /Click/i })

    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
