function Navbar() {
    return (
        <nav className="bg-black bg-opacity-25 backdrop-blur-xl top-0 sticky border-b border-white z-50">
            <div className="font-clash flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
                {/* Placeholder for Spacing */}
                <div></div>

                {/* Navigation Links */}
                <div className="flex space-x-6">
                    <a
                        href="#home"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        home
                    </a>
                    <a
                        href="#guide"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        guide
                    </a>
                    <a
                        href="#stack"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        stack
                    </a>

                    <a
                        href="#about"
                        className="text-lg text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                    >
                        about
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


