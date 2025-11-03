import { useState } from "react";
import "./App.css";
import { stringCalculator } from "./stringCalculator";

const App = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState("");

    const handleCalculate = () => {
        try {
            const result = stringCalculator(input);
            setResult(result);
            setError("");
        } catch (e: any) {
            setError(e.message);
            setResult(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCalculate();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        setError("");
        setResult(null);
    };

    return (
        <main className="container">
            <img
                src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={600}
                height={400}
                alt="A calculator, a pen, and a notebook on a wooden table, representing the calculation of numbers."
            />

            <h1>String Calculator</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="numbers">Enter numbers</label>

                <textarea
                    id="numbers"
                    placeholder="Enter numbers"
                    value={input}
                    onChange={handleInputChange}
                    aria-describedby={error ? "error-message" : undefined}
                    aria-invalid={!!error}
                />

                <button type="submit">Calculate</button>
            </form>

            {result !== null && (
                <p className="result" aria-live="polite">
                    Result: {result}
                </p>
            )}
            {error && (
                <div id="error-message" role="alert" className="error">
                    <p>{error}</p>
                </div>
            )}
        </main>
    );
};

export default App;
