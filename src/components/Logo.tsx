import { useRef, useEffect, useState } from "react";

export function Logo() {
    const logoRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const logo = logoRef.current;
        if (!logo) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!hovered) return;

            const { left, top, width, height } = logo.getBoundingClientRect();
            const x = e.clientX - (left + width / 2);
            const y = e.clientY - (top + height / 2);

            // Simulate "weight" by easing movement
            setPosition((prev) => ({
                x: prev.x + (x - prev.x) * 0.1, // Smooth follow effect
                y: prev.y + (y - prev.y) * 0.1,
            }));
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [hovered]);

    return (
        <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setPosition({ x: 0, y: 0 }); // Reset position on leave
            }}
        >
            {/* Logo */}
            <div
                ref={logoRef}
                className={`relative transition-transform duration-300 ease-out ${
                    hovered ? "scale-150 z-50" : "scale-100"
                }`}
                style={{
                    transform: hovered
                        ? `translate(${position.x}px, ${position.y}px) scale(1.5)`
                        : "scale(1)",
                }}
            >
                <img src="/rainbowicon.svg" alt="Rainbow Logo" className="w-16 h-16 select-none" />
            </div>
        </div>
    );
}
