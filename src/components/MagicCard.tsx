import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "../utils/cn";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
    gradientFrom?: string;
    gradientTo?: string;
}

export function MagicCard({
                              children,
                              className,
                              gradientSize = 300,
                              gradientColor = "#0e0e0e",
                              gradientOpacity = 0.8,
                              gradientFrom = "#b0b0b0",
                              gradientTo = "#FE8BBB", // Default, can be overwritten
                          }: MagicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (cardRef.current) {
                const { left, top } = cardRef.current.getBoundingClientRect();
                const clientX = e.clientX;
                const clientY = e.clientY;
                mouseX.set(clientX - left);
                mouseY.set(clientY - top);
            }
        },
        [mouseX, mouseY],
    );

    const handleMouseOut = useCallback(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [mouseX, mouseY, gradientSize]);

    const handleMouseEnter = useCallback(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [mouseX, mouseY, gradientSize]);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseout", handleMouseOut);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [handleMouseMove, handleMouseOut, handleMouseEnter]);

    return (
        <div
            ref={cardRef}
            className={cn("group relative flex size-full rounded-xl", className)}
        >
            <div className="absolute inset-px z-10 rounded-xl bg-background" />
            <div className="relative z-30">{children}</div>
            <motion.div
                className="pointer-events-none absolute inset-px z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
                    `,
                    opacity: gradientOpacity,
                }}
            />
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl bg-border duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                        ${gradientFrom}, 
                        ${gradientTo}, 
                        hsl(var(--border)) 100%
                    )
                    `,
                }}
            />
        </div>
    );
}
