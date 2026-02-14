import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="footer-logo-icon">
                                <FiShield />
                            </div>
                            <span className="footer-logo-text">
                                Fin<span>Shield</span>
                            </span>
                        </div>
                        <p className="footer-brand-text">
                            Empowering Indian families with smart financial planning tools and
                            insurance awareness. Plan ahead, protect your loved ones, and
                            secure their future with informed decisions.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/life-insurance">Life Insurance</Link></li>
                            <li><Link to="/health-insurance">Health Insurance</Link></li>
                            <li><Link to="/education-calculator">Education Planner</Link></li>
                            <li><Link to="/insights">Insights</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-title">Resources</h4>
                        <ul className="footer-links">
                            <li><Link to="/recommendations">Recommendations</Link></li>
                            <li><Link to="/legal">Privacy Policy</Link></li>
                            <li><Link to="/legal">Disclaimer</Link></li>
                            <li><Link to="/legal">Terms of Use</Link></li>
                        </ul>
                    </div>


                </div>



                <div className="footer-bottom">
                    <p className="footer-bottom-text">
                        © {new Date().getFullYear()} FinShield. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
