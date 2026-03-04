import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders label and input', () => {
    render(<Input label="Email" placeholder="Enter email" />)
    expect(screen.getByText(/Email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Input label="Email" error="Invalid email" />)
    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<Input label="Password" type="password" placeholder="Enter password" />)

    // Use placeholder instead of label
    const input = screen.getByPlaceholderText(/Enter password/i)
    expect(input).toHaveAttribute('type', 'password')

    const toggleButton = screen.getByRole('button')
    await user.click(toggleButton)

    expect(input).toHaveAttribute('type', 'text')
  })
})
