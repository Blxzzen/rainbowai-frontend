//import React from "react";

function Navbar() {
    return (
        <nav className="bg-black border-b border-white">
            <div className="grid grid-cols-4 items-center max-w-7xl mx-auto px-4 py-4">
                {/* Logo or Brand Name */}
                <h1 className="text-2xl font-bold text-white col-span-1">Rainbow AI</h1>

                {/* Navigation Links */}
                <div className="col-span-3 flex justify-evenly">
                    <a
                        href="#stack"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        Stack
                    </a>
                    <a
                        href="#how-it-works"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        How It Works
                    </a>
                    <a
                        href="#about"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        About
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

