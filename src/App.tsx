import { useState } from "react";
import { stringCalculator } from "./stringCalculator";
import "./App.css";

const App = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const handleCalculate = () => {
        try {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        setError(null);
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
                    <em>Result:</em>
                    {result.split(",").map((res) => (
                        <span key={res}>{res}</span>
                    ))}
                </p>
            )}
            {error && (
                <div id="error-message" role="alert">
                    <p>Please enter a numbers properly!</p>
                    <p>{error.message}</p>
                </div>
            )}
        </main>
    );
};

export default App;
