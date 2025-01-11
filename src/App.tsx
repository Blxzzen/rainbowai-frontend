import { useState } from "react";
import NavBar from "./components/Navbar";
import Stack from "./components/Stack";

function App() {
    const [hue, setHue] = useState(180);
    const [saturation, setSaturation] = useState(50);
    const [lightness, setLightness] = useState(50);
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    const handleSubmit = async () => {
        setIsLoading(true);
        setResult(null);

        try {
            const canvas = document.createElement("canvas");
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, 32, 32);
            }
            const imageData = canvas.toDataURL("image/png").split(",")[1];

            const response = await fetch("https://rainbowai-backend.onrender.com/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: imageData }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const data = await response.json();
            setResult(data.predicted_color);
        } catch (error) {
            console.error("Error:", error);
            setResult("Error: Unable to get prediction");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blend-overlay bg-gradient-to-bl from-neutral-950 to-neutral-900 text-white bg-contain">

            {/* NavBar */}
            <NavBar />

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-[calc(95vh-128px)]">
                <h1
                    className="font-clash text-8xl font-bold text-center mb-40 bg-gradient-to-b from-slate-50 bg-clip-text text-transparent"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #F8FAFC, hsl(${hue}, ${saturation}%, ${lightness}%))`,
                    }}>
                    rainbowai
                </h1>
                <div className="grid grid-cols-2 w-full max-w-6xl gap-8">
                    {/* Left Side: HSL Sliders */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-4">
                            <label className="font-clash block text-lg font-medium">Hue</label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={hue}
                                onChange={(e) => setHue(Number(e.target.value))}
                                className="w-full h-2 appearance-none rounded-lg"
                                style={{
                                    background: "linear-gradient(to right, red, orange, yellow, green, cyan, blue, violet, red)",
                                }}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="font-clash block text-lg font-medium">Saturation</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={saturation}
                                onChange={(e) => setSaturation(Number(e.target.value))}
                                className="w-full h-2 appearance-none rounded-lg"
                                style={{
                                    background: `linear-gradient(to right, gray, ${`hsl(${hue}, 100%, ${lightness}%)`})`,
                                }}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="font-clash block text-lg font-medium">Lightness</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={lightness}
                                onChange={(e) => setLightness(Number(e.target.value))}
                                className="w-full h-2 appearance-none rounded-lg"
                                style={{
                                    background: `linear-gradient(to right, black, ${`hsl(${hue}, ${saturation}%, 50%)`}, white)`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Side: Color Display and Prediction */}
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div
                            className="w-64 h-64 rounded-lg shadow-lg"
                            style={{
                                backgroundColor: color,
                                backgroundImage: `radial-gradient(circle, ${color} 50%, transparent 100%)`,
                            }}
                        ></div>
                        {result && (
                            <p className="font-clash text-xl font-semibold text-center">
                                <strong>Predicted Color:</strong> {result}
                            </p>
                        )}
                        <button
                            onClick={handleSubmit}
                            className="font-clash px-8 py-3 border-neutral-50 border-2 bg-transparent text-lg rounded-lg hover:bg-neutral-50 hover:text-neutral-950 transition"
                            disabled={isLoading}
                        >
                            {isLoading ? "Predicting..." : "Predict"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Stack Section */}
            <div id="stack" className="pt-20">
                <Stack hue={hue} sat={saturation} light={lightness} />
            </div>
        </div>
    );
}

export default App;
