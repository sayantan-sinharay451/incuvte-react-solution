import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import * as calc from "../stringCalculator";

// Mock stringCalculator to control success and error flows
vi.mock("../stringCalculator", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../stringCalculator")>();
    return {
        ...actual,
        stringCalculator: vi.fn(),
    };
});

const getTextarea = () =>
    screen.getByLabelText(/enter numbers/i) as HTMLTextAreaElement;
const getSubmit = () => screen.getByRole("button", { name: /calculate/i });

describe("App", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the heading and form controls", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", {
                level: 1,
                name: /string calculator/i,
            })
        ).toBeInTheDocument();
        expect(getTextarea()).toBeInTheDocument();
        expect(getSubmit()).toBeInTheDocument();
    });

    it("submits input and renders result spans on success", () => {
        (
            calc.stringCalculator as unknown as ReturnType<typeof vi.fn>
        ).mockReturnValue("3,12");

        render(<App />);

        fireEvent.change(getTextarea(), { target: { value: "1+2\n3*4" } });
        fireEvent.click(getSubmit());

        // result paragraph
        const resultRegion = screen.getByText(/result:/i).closest("p");
        expect(resultRegion).toHaveAttribute("aria-live", "polite");

        // spans for each line
        const spans = screen.getAllByText(/^(3|12)$/);
        expect(spans).toHaveLength(2);
    });

    it("shows an accessible error region on failure and sets aria-invalid + aria-describedby", () => {
        (
            calc.stringCalculator as unknown as ReturnType<typeof vi.fn>
        ).mockImplementation(() => {
            throw new Error("Invalid number: invalid");
        });

        render(<App />);

        const textarea = getTextarea();
        fireEvent.change(textarea, { target: { value: "invalid" } });
        fireEvent.click(getSubmit());

        const alert = screen.getByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(/please enter a numbers properly/i);
        expect(alert).toHaveTextContent(/invalid number: invalid/i);

        expect(textarea).toHaveAttribute("aria-invalid", "true");
        expect(textarea).toHaveAttribute("aria-describedby", "error-message");
    });

    it("clears previous result and error when typing new input", () => {
        (
            calc.stringCalculator as unknown as ReturnType<typeof vi.fn>
        ).mockReturnValueOnce("5");

        render(<App />);

        // first successful submit
        fireEvent.change(getTextarea(), { target: { value: "2+3" } });
        fireEvent.click(getSubmit());
        expect(screen.getByText(/result:/i)).toBeInTheDocument();

        // type to clear
        fireEvent.change(getTextarea(), { target: { value: "1+1" } });

        // result cleared
        expect(screen.queryByText(/result:/i)).toBeNull();
        // error cleared
        expect(screen.queryByRole("alert")).toBeNull();
    });

    it("invokes stringCalculator with the current textarea value on submit", () => {
        (
            calc.stringCalculator as unknown as ReturnType<typeof vi.fn>
        ).mockReturnValue("7");

        render(<App />);

        fireEvent.change(getTextarea(), { target: { value: "3+4" } });
        fireEvent.submit(getTextarea().form!);

        expect(calc.stringCalculator).toHaveBeenCalledTimes(1);
        expect(calc.stringCalculator).toHaveBeenCalledWith("3+4");
    });

    it("does not show result region when result is null", () => {
        render(<App />);
        expect(screen.queryByText(/result:/i)).toBeNull();
    });
});
