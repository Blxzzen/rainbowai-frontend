function Navbar() {
    return (
        <nav className="bg-black bg-opacity-35 backdrop-blur-xl top-0 sticky border-b border-white">
            <div className="font-clash flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
                {/* Placeholder for Spacing */}
                <div></div>

                {/* Navigation Links */}
                <div className="flex space-x-6">
                    <a
                        href="#how-it-works"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        How It Works
                    </a>
                    <a
                        href="#stack"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        Stack
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


