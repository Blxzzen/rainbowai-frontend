import { Logo } from "./Logo";

function Navbar() {
    return (
        <nav className="bg-black bg-opacity-25 backdrop-blur-xl top-0 sticky border-b border-white z-50">
            <div className="font-clash flex items-center justify-between max-w-7xl mx-auto py-2">

                {/* Rainbow Logo */}
                <Logo />
                {/* Placeholder for Spacing */}
                <div></div>

                {/* Navigation Links */}
                <div className="flex space-x-8 py-2">
                    <a
                        href="#home"
                        className="text-xl text-white transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                    >
                        home
                    </a>
                    <a
                        href="#guide"
                        className="text-xl text-white transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                    >
                        guide
                    </a>
                    <a
                        href="#stack"
                        className="text-xl text-white transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                    >
                        stack
                    </a>

                    <a
                        href="#about"
                        className="text-xl text-white transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                    >
                        about
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


