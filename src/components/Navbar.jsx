import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/life-insurance', label: 'Life Insurance' },
        { path: '/health-insurance', label: 'Health Insurance' },
        { path: '/education-calculator', label: 'Education Planner' },
        { path: '/medical-calculator', label: 'Medical Calculator' },
        { path: '/insights', label: 'Insights' },
        { path: '/recommendations', label: 'Recommendations' },
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <div className="navbar-logo-icon">
                            <FiShield />
                        </div>
                        <span className="navbar-logo-text">
                            Fin<span>Shield</span>
                        </span>
                    </Link>

                    <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                        <ul className="navbar-links">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={location.pathname === link.path ? 'active' : ''}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="navbar-cta">
                            <Link to="/life-insurance" className="btn btn-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div
                        className={`navbar-toggle ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
            <div
                className={`mobile-overlay ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(false)}
            />
        </>
    );
};

export default Navbar;
