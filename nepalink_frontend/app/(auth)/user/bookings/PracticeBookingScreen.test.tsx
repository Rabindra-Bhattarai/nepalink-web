import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PracticeBookingScreen from "./PracticeBookingScreen";

jest.mock("@/lib/api/member", () => ({
  createBooking: jest.fn(),
}));
import { createBooking } from "@/lib/api/member";

describe("PracticeBookingScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the heading", () => {
    render(<PracticeBookingScreen />);
    expect(screen.getByText(/Practice Booking Screen/i)).toBeInTheDocument();
  });

  it("renders the booking form", () => {
    render(<PracticeBookingScreen />);
    expect(screen.getByLabelText(/Appointment Details/i)).toBeInTheDocument();
  });

  it("disables submit button when no date", () => {
    render(<PracticeBookingScreen />);
    expect(screen.getByRole("button", { name: /Confirm Booking/i })).toBeDisabled();
  });

  it("enables submit button when date entered", async () => {
    const user = userEvent.setup();
    render(<PracticeBookingScreen />);
    const input = screen.getByLabelText(/Appointment Details/i);
    await user.type(input, "2026-03-05T10:00");
    expect(screen.getByRole("button", { name: /Confirm Booking/i })).toBeEnabled();
  });

  it("calls createBooking on submit", async () => {
    (createBooking as jest.Mock).mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<PracticeBookingScreen />);
    const input = screen.getByLabelText(/Appointment Details/i);
    await user.type(input, "2026-03-05T10:00");
    await user.click(screen.getByRole("button", { name: /Confirm Booking/i }));
    expect(createBooking).toHaveBeenCalledWith({
      nurseId: "practice-nurse-id",
      date: "2026-03-05T10:00",
    });
  });

  it("shows waiting state after success", async () => {
    (createBooking as jest.Mock).mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<PracticeBookingScreen />);
    await user.type(screen.getByLabelText(/Appointment Details/i), "2026-03-05T10:00");
    await user.click(screen.getByRole("button", { name: /Confirm Booking/i }));
    expect(await screen.findByText(/Request Pending/i)).toBeInTheDocument();
  });

  it("shows error message on failure", async () => {
    (createBooking as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    const user = userEvent.setup();
    render(<PracticeBookingScreen />);
    await user.type(screen.getByLabelText(/Appointment Details/i), "2026-03-05T10:00");
    await user.click(screen.getByRole("button", { name: /Confirm Booking/i }));
    // Component falls back to default error string
    expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("shows loading spinner while submitting", async () => {
    (createBooking as jest.Mock).mockImplementation(() => new Promise(() => {})); // never resolves
    const user = userEvent.setup();
    render(<PracticeBookingScreen />);
    await user.type(screen.getByLabelText(/Appointment Details/i), "2026-03-05T10:00");
    await user.click(screen.getByRole("button", { name: /Confirm Booking/i }));
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it('resets to idle when "Schedule Another" clicked', async () => {
    (createBooking as jest.Mock).mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<PracticeBookingScreen />);
    await user.type(screen.getByLabelText(/Appointment Details/i), "2026-03-05T10:00");
    await user.click(screen.getByRole("button", { name: /Confirm Booking/i }));
    const scheduleAnother = await screen.findByRole("button", { name: /Schedule Another/i });
    await user.click(scheduleAnother);
    expect(screen.getByRole("button", { name: /Confirm Booking/i })).toBeInTheDocument();
  });
});
