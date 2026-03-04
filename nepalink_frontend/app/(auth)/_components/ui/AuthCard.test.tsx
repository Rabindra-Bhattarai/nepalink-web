import { render, screen } from '@testing-library/react'
import { AuthCard } from './AuthCard'

describe('AuthCard', () => {
  it('renders the title and description', () => {
    render(
      <AuthCard title="Login" description="Access your account">
        <div>Form goes here</div>
      </AuthCard>
    )

    expect(screen.getByText(/Login/i)).toBeInTheDocument()
    expect(screen.getByText(/Access your account/i)).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <AuthCard title="Register" description="Create a new account">
        <button>Submit</button>
      </AuthCard>
    )

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('renders left panel static content', () => {
    render(
      <AuthCard title="Test" description="Testing">
        <div>Child</div>
      </AuthCard>
    )

    expect(screen.getByText(/NepaLink/i)).toBeInTheDocument()
    expect(screen.getByText(/Verified Caregivers/i)).toBeInTheDocument()
    expect(screen.getByText(/Real-Time Updates/i)).toBeInTheDocument()
    expect(screen.getByText(/Seamless Communication/i)).toBeInTheDocument()
  })
})
