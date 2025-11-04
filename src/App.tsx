import { useEffect, useRef, useState } from "react";
import { stringCalculator } from "./stringCalculator";
import "./App.css";

const App = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const alertRef = useRef<HTMLDivElement | null>(null);

    const handleCalculate = () => {
        // If empty input, show secondary message and skip calculation
        try {
            if (input.trim() === "") {
                setResult(null);
                setError(new Error("Input is empty"));
                return;
            }
            const ans = stringCalculator(input);
            setResult(ans);
            setError(null);
        } catch (e) {
            setError(e as Error);
            setResult(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCalculate();
    };

    useEffect(() => {
        if (error) {
            alertRef.current?.focus();
        }
    }, [error]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        setError(null);
        setResult(null);
    };

    return (
        <>
            <a href="#main" className="skip-link">Skip to main content</a>
            <main id="main" className="container">
            <img
                src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={600}
                height={400}
                alt=""
                role="presentation"
                aria-hidden="true"
            />

            <h1>String Calculator</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="numbers">Enter numbers</label>
                <p id="instructions">
                    Enter one expression per line using digits and operators +,
                    -, *, /. Example:
                    <code>1+2</code> on a line, and <code>3*4</code> on the
                    next.
                </p>
                <textarea
                    id="numbers"
                    placeholder="Enter numbers"
                    value={input}
                    onChange={handleInputChange}
                    aria-describedby={
                        error ? "instructions error-message" : "instructions"
                    }
                    aria-errormessage={error ? "error-message" : undefined}
                    aria-invalid={!!error}
                />

                <button type="submit">Calculate</button>
            </form>

            {result !== null && (
                <section aria-live="polite" aria-label="Results">
                    <h2>Results</h2>
                    <ul className="result">
                        {result.split(",").map((res) => (
                            <li key={res}>{res}</li>
                        ))}
                    </ul>
                </section>
            )}
            {error && (
                <div id="error-message" role="alert" ref={alertRef} tabIndex={-1}>
                    <p>
                        There’s a problem with your input. Please enter numbers
                        and operators (+, -, *, /) only. Example: 1+2
                    </p>
                    <p
                        className="secondary-message"
                        role="status"
                        aria-live="polite"
                    >
                        {error.message}
                    </p>
                </div>
            )}
        </main>
        </>
    );
};

export default App;
