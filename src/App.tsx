import { useState } from "react";
import NavBar from "./components/Navbar";
import Stack from "./components/Stack";
import Guide from "./components/Guide";

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
        <div id="home" className="relative z-20 min-h-screen bg-blend-overlay bg-gradient-to-bl from-neutral-950 to-neutral-900 text-white bg-contain">

            {/* NavBar */}
            <NavBar />

            {/* Hero Section */}
            <div className="min-h-screen flex flex-col items-center justify-center min-h-[calc(95vh-128px)]">
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
                        <div className="flex flex-col items-center justify-center gap-4">
                            {/* Reserved Space for Prediction */}
                            <p
                                className="font-clash text-xl font-semibold text-center h-6"
                                style={{
                                    visibility: result ? "visible" : "hidden",
                                }}
                            >
                                <strong>Prediction:</strong>&nbsp;&nbsp;{result ? result[0].toUpperCase() + result.substring(1) : "Placeholder"}
                            </p>

                            {/* Predict Button */}
                            <button
                                onClick={handleSubmit}
                                className="relative w-64 font-clash px-8 py-3 border-neutral-50 border-2 bg-transparent text-lg rounded-lg overflow-hidden group transition-all duration-500 ease-in-out"
                                disabled={isLoading}
                            >
                                {/* Predict Text */}
                                <span
                                    className="relative z-10 transition-all duration-300 group-hover:text-neutral-950">
        {isLoading ? "Predicting..." : "Predict"}
    </span>

                                {/* Radial Expanding Background Effect */}
                                <div
                                    className="absolute left-1/2 top-0 w-0 h-0 bg-neutral-50 rounded-full transition-all duration-500 ease-in-out group-hover:w-[200%] group-hover:h-[400%] -translate-x-1/2"
                                ></div>
                            </button>


                        </div>
                    </div>
                </div>
            </div>

            {/* Guide Section */}
            <div id="guide">
                <Guide hue={hue} sat={saturation} light={lightness}/>
            </div>

            {/* Stack Section */}
            <div id="stack">
                <Stack hue={hue} sat={saturation} light={lightness}/>
            </div>
        </div>
    );
}

export default App;
