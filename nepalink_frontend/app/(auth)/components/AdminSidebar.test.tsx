import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminSidebar from './AdminSidebar'

// Create a reusable mock for router.push
const mockPush = jest.fn()

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock clearAuthCookies
import { clearAuthCookies } from '../../../lib/cookie'
jest.mock('../../../lib/cookie', () => ({
  clearAuthCookies: jest.fn(),
}))

describe('AdminSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders branding', () => {
    render(<AdminSidebar />)
    expect(screen.getByText(/NepaLink/i)).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    render(<AdminSidebar />)
    expect(screen.getByRole('button', { name: /Dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Manage Users/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Bookings/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Nurse Workload/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Settings/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument()
  })

  it('calls logout handler', async () => {
    const user = userEvent.setup()

    render(<AdminSidebar />)

    const logoutButton = screen.getByRole('button', { name: /Logout/i })
    await user.click(logoutButton)

    expect(clearAuthCookies).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
