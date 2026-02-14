import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
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

                    <div className="footer-col">
                        <h4 className="footer-title">Contact Us</h4>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon"><FiMail /></div>
                            <div>
                                <div style={{ color: 'rgba(255,255,255,0.8)' }}>Email</div>
                                support@finshield.in
                            </div>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon"><FiPhone /></div>
                            <div>
                                <div style={{ color: 'rgba(255,255,255,0.8)' }}>Phone</div>
                                +91 98765 43210
                            </div>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon"><FaWhatsapp /></div>
                            <div>
                                <div style={{ color: 'rgba(255,255,255,0.8)' }}>WhatsApp</div>
                                +91 98765 43210
                            </div>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon"><FiMapPin /></div>
                            <div>
                                <div style={{ color: 'rgba(255,255,255,0.8)' }}>Location</div>
                                India
                            </div>
                        </div>
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
