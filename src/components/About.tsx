interface AboutProps {
    hue: number;
    sat: number;
    light: number;
}

export function About({ hue, sat, light }: AboutProps) {
    return (
        <div className="relative z-20 text-white py-24 font-clash">
            {/* Section Title */}
            <h2
                className="text-5xl font-bold text-center mb-16 bg-gradient-to-b from-slate-50 bg-clip-text text-transparent"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #F8FAFC, hsl(${hue}, ${sat}%, ${light}%))`,
                }}
            >
                About &nbsp;Project
            </h2>

            {/* Content Layout */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-32">
                {/* Left - Image */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src="/about-image.jpg" // Replace with the actual image path
                        alt="Project Overview"
                        className="w-full max-w-md rounded-lg shadow-lg"
                    />
                </div>

                {/* Right - Text Content */}
                <div className="w-full lg:w-1/2">
                    <h3 className="text-3xl font-semibold mb-4 text-slate-200">
                        Bringing AI-Powered Colour Recognition to Life
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        This project utilizes **machine learning** to analyze and predict colours based on user input.
                        The model was trained on **50,000 images**, ensuring precise and adaptable predictions.
                    </p>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                        By leveraging advanced **hue, saturation, and lightness (HSL) processing**, the model determines
                        the most accurate colour category, whether it be **Red, Orange, Yellow, Green, Blue, Purple, or shades
                        like Black, White, and Gray**. The interactive interface allows users to see predictions update
                        in real time, offering an immersive experience.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
