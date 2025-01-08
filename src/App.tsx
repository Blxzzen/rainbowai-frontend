//import React from "react";
import { useState } from "react";
import NavBar from "./components/Navbar";

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
            // Create a 32x32 solid colour image in base64 format
            const canvas = document.createElement("canvas");
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, 32, 32);
            }
            const imageData = canvas.toDataURL("image/png").split(",")[1]; // Extract base64 data

            // Send the image data to the backend
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
        <div className="min-h-screen bg-black text-white">
            {/* NavBar */}
            <NavBar />

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="grid grid-cols-2 w-full max-w-6xl gap-8">
                    {/* Left Side: HSL Sliders */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-4">
                            <label className="block text-lg font-medium">Hue</label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={hue}
                                onChange={(e) => setHue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-lg font-medium">Saturation</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={saturation}
                                onChange={(e) => setSaturation(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-lg font-medium">Lightness</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={lightness}
                                onChange={(e) => setLightness(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none"
                            />
                        </div>
                    </div>

                    {/* Right Side: Color Display and Prediction */}
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div
                            className="w-64 h-64 rounded-lg shadow-lg"
                            style={{ backgroundColor: color }}
                        ></div>
                        {result && (
                            <p className="text-xl font-semibold text-center">
                                <strong>Predicted Color:</strong> {result}
                            </p>
                        )}
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-3 bg-purple-600 text-lg rounded-lg hover:bg-purple-700 transition"
                            disabled={isLoading}
                        >
                            {isLoading ? "Predicting..." : "Predict"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

