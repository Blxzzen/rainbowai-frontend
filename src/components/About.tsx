interface AboutProps {
    hue: number;
    sat: number;
    light: number;
}

export function About({ hue, sat, light }: AboutProps) {
    return (
        <div className="relative z-20 text-white py-40 font-clash">
            {/* Section Title */}
            <h2
                className="text-5xl font-bold text-center mb-20 bg-gradient-to-b from-slate-50 bg-clip-text text-transparent"
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
                        src="rm-image.png"
                        alt="Project Overview"
                        className="w-full max-w-md rounded-lg shadow-lg"
                    />
                </div>

                {/* Right - Text Content */}
                <div className="w-full lg:w-1/2">
                    <h3 className="text-3xl font-semibold mb-4 text-slate-200 [word-spacing:2px]">
                        Why This Project?
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed [word-spacing:2px]">
                        I chose this project as a stepping stone into new technology and to explore machine learning
                        projects so I can develop more advanced solutions to problems I face in my everyday life.
                    </p>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed [word-spacing:2px]">
                        While a machine learning model that recognizes colours might not be that useful, this
                        technology opens the door to a world of practical machine learning projects that I'm
                        extremely excited to explore. I'm eager to integrate machine learning in my future finance
                        and image recognition projects. This was a fun warm up and test of my current skills building
                        both the front-end and back-end! :)
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
