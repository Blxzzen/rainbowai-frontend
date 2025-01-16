import { MagicCard } from "./MagicCard";
import stackIcons from "../utils/importIcons";

interface StackProps {
    hue: number;
    sat: number;
    light: number;
}

export function Stack({ hue, sat, light }: StackProps) {
    const stackItems = [
        // Backend
        { name: "Python", icon: stackIcons["python"] },
        { name: "Flask", icon: stackIcons["flask"] },
        { name: "SciKit-Learn", icon: stackIcons["sklearn"] },

        // Frontend
        { name: "React", icon: stackIcons["react"] },
        { name: "TailwindCSS", icon: stackIcons["tailwind"] },
        { name: "Render", icon: stackIcons["render"] },

    ];

    const dynamicGradientTo = `hsl(${hue}, ${sat}%, ${light}%)`; // Match Hue slider

    return (
        <div className="relative z-20 bg-black text-white py-24 font-clash"> {/* Increased padding for more space */}
            <h2
                className="text-5xl font-bold text-center mb-16 bg-gradient-to-b from-slate-50 bg-clip-text text-transparent"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #F8FAFC, hsl(${hue}, ${sat}%, ${light}%))`,
                }}
            >
                Tech Stack
            </h2>
            <div
                className={
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-32"
                    // Added grid layout, 1 column for small screens, 2 columns for medium, 3 for large.
                    // Added gap between items, and padding on the sides for larger screens
                }
            >
                {stackItems.map((item, index) => (
                    <MagicCard
                        key={index}
                        className="cursor-pointer flex items-center justify-center p-14 shadow-2xl rounded-lg"
                        gradientTo={dynamicGradientTo} // Pass dynamic gradient
                    >
                        <div className="flex flex-row items-center justify-between h-full space-x-4">
                            <img
                                src={item.icon}
                                alt={item.name}
                                className="w-16 h-16 object-contain"
                            />
                            <span className="text-lg font-semibold">{item.name}</span>
                        </div>
                    </MagicCard>
                ))}
            </div>
        </div>
    );
}

export default Stack;


