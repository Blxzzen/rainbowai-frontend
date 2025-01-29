interface AboutProps {
    hue: number;
    sat: number;
    light: number;
}

export function About({ hue, sat, light }: AboutProps) {
    return (
        <div className="relative z-20 text-white py-24 font-clash"> {/* Increased padding for more space */}
            <h2
                className="text-5xl font-bold text-center mb-16 bg-gradient-to-b from-slate-50 bg-clip-text text-transparent"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #F8FAFC, hsl(${hue}, ${sat}%, ${light}%))`,
                }}
            >
                About &nbsp;Project
            </h2>
            <div
                className={
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-32"
                    // Added grid layout, 1 column for small screens, 2 columns for medium, 3 for large.
                    // Added gap between items, and padding on the sides for larger screens
                }
            >
            </div>
        </div>
    );
}

export default About;