import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PracticeNurseForm from "./PracticeNurseForm";

describe("PracticeNurseForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- BASIC RENDERING ---
  it("renders heading", () => {
    render(<PracticeNurseForm />);
    expect(screen.getByText(/Practice Nurse Form/i)).toBeInTheDocument();
  });

  it("renders name input", () => {
    render(<PracticeNurseForm />);
    expect(screen.getByLabelText(/Nurse Name/i)).toBeInTheDocument();
  });

  it("renders specialty input", () => {
    render(<PracticeNurseForm />);
    expect(screen.getByLabelText(/Specialty/i)).toBeInTheDocument();
  });

  it("disables submit button initially", () => {
    render(<PracticeNurseForm />);
    expect(screen.getByRole("button", { name: /Register Nurse/i })).toBeDisabled();
  });

  // --- FORM INTERACTION ---
  it("enables submit button when fields filled", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.type(screen.getByLabelText(/Nurse Name/i), "Alice");
    await user.type(screen.getByLabelText(/Specialty/i), "Pediatrics");
    expect(screen.getByRole("button", { name: /Register Nurse/i })).toBeEnabled();
  });

  it("shows confirmation after submit", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.type(screen.getByLabelText(/Nurse Name/i), "Alice");
    await user.type(screen.getByLabelText(/Specialty/i), "Pediatrics");
    await user.click(screen.getByRole("button", { name: /Register Nurse/i }));
    expect(await screen.findByText(/Nurse Registered/i)).toBeInTheDocument();
  });

  it("displays submitted nurse details", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.type(screen.getByLabelText(/Nurse Name/i), "Bob");
    await user.type(screen.getByLabelText(/Specialty/i), "Cardiology");
    await user.click(screen.getByRole("button", { name: /Register Nurse/i }));
    expect(await screen.findByText(/Name: Bob/i)).toBeInTheDocument();
    expect(await screen.findByText(/Specialty: Cardiology/i)).toBeInTheDocument();
  });

  it("renders 'Register Another' button after submit", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.type(screen.getByLabelText(/Nurse Name/i), "Alice");
    await user.type(screen.getByLabelText(/Specialty/i), "Pediatrics");
    await user.click(screen.getByRole("button", { name: /Register Nurse/i }));
    expect(await screen.findByRole("button", { name: /Register Another/i })).toBeInTheDocument();
  });

  it("resets form when 'Register Another' clicked", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.type(screen.getByLabelText(/Nurse Name/i), "Alice");
    await user.type(screen.getByLabelText(/Specialty/i), "Pediatrics");
    await user.click(screen.getByRole("button", { name: /Register Nurse/i }));
    const resetBtn = await screen.findByRole("button", { name: /Register Another/i });
    await user.click(resetBtn);
    expect(screen.getByText(/Practice Nurse Form/i)).toBeInTheDocument();
  });

  it("does not submit with empty fields", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.click(screen.getByRole("button", { name: /Register Nurse/i }));
    expect(screen.getByText(/Practice Nurse Form/i)).toBeInTheDocument();
  });

  // --- EXTRA CASES FOR ROBUSTNESS ---
  it("does not submit with only name filled", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.type(screen.getByLabelText(/Nurse Name/i), "Alice");
    await user.click(screen.getByRole("button", { name: /Register Nurse/i }));
    expect(screen.getByText(/Practice Nurse Form/i)).toBeInTheDocument();
  });

  it("does not submit with only specialty filled", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.type(screen.getByLabelText(/Specialty/i), "Pediatrics");
    await user.click(screen.getByRole("button", { name: /Register Nurse/i }));
    expect(screen.getByText(/Practice Nurse Form/i)).toBeInTheDocument();
  });

  it("input fields clear after reset", async () => {
    const user = userEvent.setup();
    render(<PracticeNurseForm />);
    await user.type(screen.getByLabelText(/Nurse Name/i), "Alice");
    await user.type(screen.getByLabelText(/Specialty/i), "Pediatrics");
    await user.click(screen.getByRole("button", { name: /Register Nurse/i }));
    const resetBtn = await screen.findByRole("button", { name: /Register Another/i });
    await user.click(resetBtn);

    // Re-query fresh inputs after reset
    const nameInput = screen.getByLabelText(/Nurse Name/i);
    const specialtyInput = screen.getByLabelText(/Specialty/i);

    expect(nameInput).toHaveValue("");
    expect(specialtyInput).toHaveValue("");
  });

  it("form is accessible via labels", () => {
    render(<PracticeNurseForm />);
    expect(screen.getByLabelText(/Nurse Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Specialty/i)).toBeInTheDocument();
  });

  it("submit button has correct text", () => {
    render(<PracticeNurseForm />);
    expect(screen.getByRole("button", { name: /Register Nurse/i })).toBeInTheDocument();
  });
});
