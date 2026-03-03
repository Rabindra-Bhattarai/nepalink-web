import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PracticeUserDashboard from "./useDashboardScreen";

describe("PracticeUserDashboard", () => {
  it("renders heading", () => {
    render(<PracticeUserDashboard />);
    expect(screen.getByText(/Practice User Dashboard/i)).toBeInTheDocument();
  });

  it("renders notifications section", () => {
    render(<PracticeUserDashboard />);
    expect(screen.getByRole("heading", { name: /Notifications/i })).toBeInTheDocument();
  });

  it("renders tasks section", () => {
    render(<PracticeUserDashboard />);
    expect(screen.getByRole("heading", { name: /Tasks/i })).toBeInTheDocument();
  });

  it("shows initial notifications", () => {
    render(<PracticeUserDashboard />);
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your booking is confirmed./i)).toBeInTheDocument();
  });

  it("shows initial tasks", () => {
    render(<PracticeUserDashboard />);
    expect(screen.getByText(/Finish report/i)).toBeInTheDocument();
    expect(screen.getByText(/Call nurse/i)).toBeInTheDocument();
  });

  it("clears notifications when button clicked", async () => {
    const user = userEvent.setup();
    render(<PracticeUserDashboard />);
    await user.click(screen.getByRole("button", { name: /Clear Notifications/i }));
    expect(screen.getByText(/No notifications/i)).toBeInTheDocument();
  });

  it("clears tasks when button clicked", async () => {
    const user = userEvent.setup();
    render(<PracticeUserDashboard />);
    await user.click(screen.getByRole("button", { name: /Clear Tasks/i }));
    expect(screen.getByText(/No tasks/i)).toBeInTheDocument();
  });

  it("renders both clear buttons", () => {
    render(<PracticeUserDashboard />);
    expect(screen.getByRole("button", { name: /Clear Notifications/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Clear Tasks/i })).toBeInTheDocument();
  });
});
