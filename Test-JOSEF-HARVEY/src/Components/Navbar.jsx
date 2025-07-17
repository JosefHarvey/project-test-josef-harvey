import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const logoUrl = "https://suitmedia.com/_ipx/w_100&f_webp&q_100/assets/img/site-logo.png ";
    const controlNavbar = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { 
            setVisible(false);
        } else { 
            setVisible(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, 
    [lastScrollY]);

    const location = useLocation();
    const navLinkClassName = ({ isActive }) =>
        `pb-1 transition-all duration-300 ${
            isActive
                ? 'font-bold border-b-2 border-orange-500 text-white'
                : 'text-white/80 hover:text-white'
        }`;

    return (
        <header
            className={`
                fixed top-0 w-full z-50 transition-all duration-500 ease-in-out
                ${visible ? 'translate-y-0' : '-translate-y-full'}
                ${lastScrollY > 50 ? 'bg-[#FF6600]/80 backdrop-blur-sm shadow-lg' : 'bg-[#FF6600]'}
            `}
        >
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink to="/">
                    <img src={logoUrl} alt="Suitmedia Logo" className="h-8 brightness-0 invert" />
                </NavLink>

                <div className="hidden md:flex items-center space-x-8 text-sm">
                    <NavLink to="/work" className={navLinkClassName}>Work</NavLink>
                    <NavLink to="/about" className={navLinkClassName}>About</NavLink>
                    <NavLink to="/services" className={navLinkClassName}>Services</NavLink>
                    <NavLink to="/ideas" className={location.pathname.startsWith('/ideas') ? navLinkClassName({ isActive: true }) : navLinkClassName}>Ideas</NavLink>
                    <NavLink to="/careers" className={navLinkClassName}>Careers</NavLink>
                    <NavLink to="/contact" className={navLinkClassName}>Contact</NavLink>
                </div>
            </nav>
        </header>
    );
}