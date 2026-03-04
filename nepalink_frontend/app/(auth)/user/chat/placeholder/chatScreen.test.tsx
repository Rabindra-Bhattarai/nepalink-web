import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PracticeChatScreen from "./chatScreen";

describe("PracticeChatScreen", () => {
  it("renders heading", () => {
    render(<PracticeChatScreen />);
    expect(screen.getByText(/Practice Chat Screen/i)).toBeInTheDocument();
  });

  it("renders empty chat box initially", () => {
    render(<PracticeChatScreen />);
    expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
  });

  it("renders input field", () => {
    render(<PracticeChatScreen />);
    expect(screen.getByPlaceholderText(/Type a message/i)).toBeInTheDocument();
  });

  it("disables send button when input is empty", () => {
    render(<PracticeChatScreen />);
    expect(screen.getByRole("button", { name: /Send/i })).toBeDisabled();
  });

  it("enables send button when input has text", async () => {
    const user = userEvent.setup();
    render(<PracticeChatScreen />);
    await user.type(screen.getByPlaceholderText(/Type a message/i), "Hello");
    expect(screen.getByRole("button", { name: /Send/i })).toBeEnabled();
  });

  it("sends a message and displays it", async () => {
    const user = userEvent.setup();
    render(<PracticeChatScreen />);
    await user.type(screen.getByPlaceholderText(/Type a message/i), "Hello");
    await user.click(screen.getByRole("button", { name: /Send/i }));
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("clears input after sending", async () => {
    const user = userEvent.setup();
    render(<PracticeChatScreen />);
    const input = screen.getByPlaceholderText(/Type a message/i);
    await user.type(input, "Hello");
    await user.click(screen.getByRole("button", { name: /Send/i }));
    expect(input).toHaveValue("");
  });

  it("shows multiple messages", async () => {
    const user = userEvent.setup();
    render(<PracticeChatScreen />);
    const input = screen.getByPlaceholderText(/Type a message/i);
    await user.type(input, "First");
    await user.click(screen.getByRole("button", { name: /Send/i }));
    await user.type(input, "Second");
    await user.click(screen.getByRole("button", { name: /Send/i }));
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("does not send empty messages", async () => {
    const user = userEvent.setup();
    render(<PracticeChatScreen />);
    await user.click(screen.getByRole("button", { name: /Send/i }));
    expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
  });

  it("chat box has scrollable area", () => {
    render(<PracticeChatScreen />);
    expect(screen.getByTestId("chat-box")).toHaveClass("overflow-y-auto");
  });
});
