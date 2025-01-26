import { useState, useEffect } from "react";

interface GuideProps {
    hue: number;
    sat: number;
    light: number;
}

function Guide({ hue, sat, light }: GuideProps) {
    const [superProgress, setSuperProgress] = useState(0);

    // Same logic for forward + buffer + reverse
    const bufferDistance = 200;
    const reverseDistance = 300;

    useEffect(() => {
        const handleScroll = () => {
            const guideSection = document.getElementById("guide");
            if (!guideSection) return;

            const sectionTop = guideSection.offsetTop;
            const sectionHeight = guideSection.offsetHeight;
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            const offsetStart = 400;
            const offsetEnd = 0;

            const startScroll = sectionTop - offsetStart;
            const endScroll =
                sectionTop + sectionHeight - viewportHeight + offsetEnd;

            // 1) BEFORE parallax
            if (scrollY < startScroll) {
                setSuperProgress(0);
                return;
            }

            // 2) FORWARD (0..1)
            if (scrollY <= endScroll) {
                const forwardProgress =
                    (scrollY - startScroll) / (endScroll - startScroll); // 0..1
                setSuperProgress(Math.min(Math.max(forwardProgress, 0), 1));
                return;
            }

            // 3) BUFFER region (rainbow sits in place)
            if (scrollY <= endScroll + bufferDistance) {
                setSuperProgress(1);
                return;
            }

            // 4) REVERSE region (1..2)
            const reverseStart = endScroll + bufferDistance;
            const reverseEnd = reverseStart + reverseDistance;
            if (scrollY <= reverseEnd) {
                const reversedProgress =
                    1 + (scrollY - reverseStart) / reverseDistance; // 1..2
                setSuperProgress(Math.min(Math.max(reversedProgress, 1), 2));
                return;
            }

            // 5) DONE => superProgress=2 means fully reversed (off-screen)
            setSuperProgress(2);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Same horizontal transform for the rainbow bars
    const getRainbowTransformX = () => {
        if (superProgress <= 1) {
            // forward: -100..0
            return (superProgress - 1) * 100;
        } else if (superProgress < 2) {
            // reverse: 0..-100
            const r = superProgress - 1;
            return -(r * 100);
        }
        return -100;
    };


    // superProgress=0 => Y offset = -someAmplitude
    // superProgress=1 => Y offset = 0
    // superProgress=2 => Y offset = -someAmplitude (again)
    // speedFactor: multiply the amplitude by this factor, so some clouds move more or less.

    function getCloudTransformY(speedFactor: number) {
        // Base amplitude in px: how far the cloud travels up/down
        const amplitude = 50;
        // The "cloud offset" is amplitude * speedFactor
        const total = amplitude * speedFactor;

        if (superProgress <= 1) {
            // 0..1 => -total..0
            return -total + total * superProgress; // e.g. -50..0
        } else if (superProgress < 2) {
            // 1..2 => 0..-total
            const r = superProgress - 1; // 0..1
            return -total * r; // 0..-50
        }
        return -total; // if superProgress=2, at the bottom again
    }

    const clouds = [
        {
            src: "https://awv3node-homepage.surge.sh/build/assets/cloud.svg",
            top: "20%",
            left: "10%",
            width: "15%",
            speedFactor: 4.5,
        },
        {
            src: "https://awv3node-homepage.surge.sh/build/assets/cloud.svg",
            top: "40%",
            left: "60%",
            width: "20%",
            speedFactor: 6,
        },
        {
            src: "https://awv3node-homepage.surge.sh/build/assets/cloud.svg",
            top: "70%",
            left: "25%",
            width: "25%",
            speedFactor: 8,
        },
    ];

    // Rainbow config
    const barColors = [
        "#ff7690", // red
        "#ffb586", // orange
        "#ffe18f", // yellow
        "#9fff98", // green
        "#aae5ff", // blue
        "#9490ff", // indigo
        "#eb96fd", // purple
    ];
    const barHeight = 16;

    return (
        <div
            id="guide"
            className="relative -z-10 text-white"
            style={{ minHeight: "100vh" }}
        >
            {/*
      */}
            {(
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: -1, // behind rainbow bars
                    }}
                >
                    {clouds.map((cloud, i) => {
                        const cloudY = getCloudTransformY(cloud.speedFactor);
                        return (
                            <img
                                key={i}
                                src={cloud.src}
                                alt="cloud"
                                style={{
                                    position: "absolute",
                                    top: cloud.top,
                                    left: cloud.left,
                                    width: cloud.width,
                                    // Apply a translateY(...px) using the computed offset
                                    transform: `translateY(${cloudY}px)`,
                                    opacity: 0.85,
                                }}
                            />
                        );
                    })}
                </div>
            )}

            {/* RAINBOW BARS (unmount at superProgress=2) */}
            {(
                <div
                    className="fixed w-full will-change-transform"
                    style={{
                        top: "45%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                    }}
                >
                    {barColors.map((color, index) => (
                        <div
                            key={index}
                            className="absolute w-full"
                            style={{
                                top: `${index * barHeight}px`,
                                height: `${barHeight}px`,
                                backgroundColor: color,
                                transform: `translateX(${getRainbowTransformX()}vw)`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* GUIDE TITLE */}
            <div
                className="py-36 text-center w-full"
                style={{
                    top: "5%",
                    fontSize: "2rem",
                    fontWeight: "bold",
                }}
            >
                <h2
                    className="font-clash text-5xl font-bold text-center mb-16 bg-gradient-to-b from-slate-50 bg-clip-text text-transparent"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #F8FAFC, hsl(${hue}, ${sat}%, ${light}%))`,
                    }}
                >
                    How &nbsp;It&nbsp; Works
                </h2>
            </div>

            {/* CENTER CARD */}
            <div
                className="absolute bg-black/90 text-center rounded-lg p-6 shadow-lg max-w-2xl"
                style={{
                    top: `calc(90% - ${Math.min(superProgress, 1) * 40}vh)`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <p className="text-lg text-gray-300 font-clash font-extralight [word-spacing:2px]">
                    An ML model makes a generalized prediction on what colour is currently selected by the user.
                    The model interprets the colour as a base64 image, and was trained
                    on 50,000 different images. 49,000 of these images were colours and 1,000 were shades. The model is
                    given the options, Red, Orange, Yellow, Green, Blue, Purple, Black, White, Gray. Hue, saturation,
                    and lightness are taken into account to ensure that the model isn't just basing it's predictions on
                    colour ranges. It must also take into account how the saturation/lightness affect the overall colour.
                </p>
            </div>
        </div>
    );
}

export default Guide;
