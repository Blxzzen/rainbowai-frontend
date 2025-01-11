import { MagicCard } from "./MagicCard";
import stackIcons from "../utils/importIcons";

export function Stack() {
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
    return (
        <div className="bg-black text-white py-24"> {/* Increased padding for more space */}
            <h2 className="text-3xl font-bold text-center mb-16"> {/* Increased margin for more space between title and cards */}
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
                        gradientColor={"#181818"}
                    >
                        <div className="flex flex-row items-center justify-center h-full space-x-4">
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


