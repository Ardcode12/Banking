import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiShield, FiTrendingUp, FiTarget, FiHeart,
    FiBookOpen, FiMail, FiPhone, FiCheckCircle,
    FiUsers, FiAward, FiEye, FiSend
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactSent, setContactSent] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactSent(true);
        setTimeout(() => {
            setContactSent(false);
            setContactForm({ name: '', email: '', message: '' });
        }, 4000);
    };

    return (
        <>
            {/* ========== HERO SECTION ========== */}
            <section className="hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <div className="hero-badge" data-aos="fade-down" data-aos-delay="100">
                            <FiShield /> Trusted Financial Planning
                        </div>
                        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">
                            Secure Your Family's Future with{' '}
                            <span className="highlight">Smart Insurance Planning</span>
                        </h1>
                        <p className="hero-description" data-aos="fade-up" data-aos-delay="300">
                            Empowering Indian families with intelligent tools to plan life insurance,
                            understand health coverage, and prepare for rising education costs.
                        </p>

                        <div className="hero-features" data-aos="fade-up" data-aos-delay="400">
                            <div className="hero-feature">
                                <span className="hero-feature-icon"><FiShield /></span>
                                Life Insurance Planning & HLV Calculator
                            </div>
                            <div className="hero-feature">
                                <span className="hero-feature-icon"><FiHeart /></span>
                                Health Insurance Awareness & Guidance
                            </div>
                            <div className="hero-feature">
                                <span className="hero-feature-icon"><FiBookOpen /></span>
                                Child Education Cost Planning
                            </div>
                        </div>

                        <div className="hero-buttons" data-aos="fade-up" data-aos-delay="500">
                            <Link to="/life-insurance" className="btn btn-primary btn-lg">
                                <FiShield /> Calculate Life Insurance Coverage
                            </Link>
                            <Link to="/education-calculator" className="btn btn-outline btn-lg">
                                <FiBookOpen /> Check Education Future Cost
                            </Link>
                        </div>
                    </div>

                    <div className="hero-visual" data-aos="fade-left" data-aos-delay="400">
                        <div className="hero-visual-card">
                            <div className="hero-stat-grid">
                                <div className="hero-stat">
                                    <div className="hero-stat-icon">🛡️</div>
                                    <div className="hero-stat-value">₹1Cr+</div>
                                    <div className="hero-stat-label">Avg. Coverage Gap</div>
                                </div>
                                <div className="hero-stat">
                                    <div className="hero-stat-icon">📈</div>
                                    <div className="hero-stat-value">7%</div>
                                    <div className="hero-stat-label">Avg. Inflation Rate</div>
                                </div>
                                <div className="hero-stat">
                                    <div className="hero-stat-icon">🎓</div>
                                    <div className="hero-stat-value">2.4x</div>
                                    <div className="hero-stat-label">Education Cost Rise</div>
                                </div>
                                <div className="hero-stat">
                                    <div className="hero-stat-icon">👨‍👩‍👧‍👦</div>
                                    <div className="hero-stat-value">76%</div>
                                    <div className="hero-stat-label">Families Under-insured</div>
                                </div>
                            </div>

                            <div className="hero-floating-badge top-right">
                                <span className="hero-floating-badge-icon green"><FiCheckCircle /></span>
                                <span>Free Calculator</span>
                            </div>
                            <div className="hero-floating-badge bottom-left">
                                <span className="hero-floating-badge-icon blue"><FiTrendingUp /></span>
                                <span>Plan Ahead</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== HIGHLIGHTS SECTION ========== */}
            <section className="highlights">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">Why It Matters</span>
                        <h2 className="section-title">Key <span>Highlights</span></h2>
                        <p className="section-subtitle">
                            Understanding these critical financial factors can help you make better
                            decisions for your family's future.
                        </p>
                    </div>

                    <div className="highlights-grid">
                        <div className="highlight-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="highlight-icon"><FiTrendingUp /></div>
                            <h3>Inflation Impact</h3>
                            <p>
                                Inflation erodes your money's purchasing power over time. A course costing
                                ₹10 lakhs today could cost ₹24+ lakhs in 13 years at 7% inflation.
                            </p>
                        </div>
                        <div className="highlight-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="highlight-icon"><FiShield /></div>
                            <h3>Adequate Insurance</h3>
                            <p>
                                Most Indian families are significantly under-insured. Your life insurance
                                should ideally cover 10-15x your annual income to protect your family.
                            </p>
                        </div>
                        <div className="highlight-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="highlight-icon"><FiTarget /></div>
                            <h3>Personalized Calculators</h3>
                            <p>
                                Use our free calculators to understand your exact coverage gap, future
                                education costs, and plan your finances with clarity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== ABOUT SECTION ========== */}
            <section className="about" id="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-content">
                            <span className="section-badge" data-aos="fade-right">About Us</span>
                            <h2 data-aos="fade-right" data-aos-delay="100">
                                Our <span className="text-primary">Mission</span> & Vision
                            </h2>
                            <p data-aos="fade-right" data-aos-delay="200">
                                FinShield was created with a simple mission — to empower every Indian family
                                with the knowledge and tools to make informed financial decisions. We believe
                                financial planning should be accessible, simple, and transparent.
                            </p>
                            <p data-aos="fade-right" data-aos-delay="250">
                                We are <strong>not</strong> an insurance company or a financial advisory firm. Our
                                platform is purely educational, designed to raise awareness about the importance
                                of adequate life insurance, health coverage, and early education planning.
                            </p>

                            <div className="about-values" data-aos="fade-right" data-aos-delay="300">
                                <div className="about-value">
                                    <div className="about-value-icon"><FiEye /></div>
                                    <div>
                                        <h4>Transparency</h4>
                                        <p>Clear, unbiased information</p>
                                    </div>
                                </div>
                                <div className="about-value">
                                    <div className="about-value-icon"><FiUsers /></div>
                                    <div>
                                        <h4>Family First</h4>
                                        <p>Protect what matters most</p>
                                    </div>
                                </div>
                                <div className="about-value">
                                    <div className="about-value-icon"><FiBookOpen /></div>
                                    <div>
                                        <h4>Education</h4>
                                        <p>Awareness through knowledge</p>
                                    </div>
                                </div>
                                <div className="about-value">
                                    <div className="about-value-icon"><FiAward /></div>
                                    <div>
                                        <h4>Trust</h4>
                                        <p>No hidden agendas</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="about-visual" data-aos="fade-left" data-aos-delay="200">
                            <div className="about-visual-main">
                                <h3>🎯 Why We Built This</h3>
                                <p>
                                    In India, over 76% of families don't have adequate life insurance coverage.
                                    Most people underestimate the impact of inflation on future expenses,
                                    especially education costs. We created FinShield to bridge this awareness gap
                                    — helping you see the numbers clearly and plan proactively.
                                </p>
                                <div className="about-stats">
                                    <div className="about-stat">
                                        <div className="about-stat-value">100%</div>
                                        <div className="about-stat-label">Free Tools</div>
                                    </div>
                                    <div className="about-stat">
                                        <div className="about-stat-value">0</div>
                                        <div className="about-stat-label">Sales Pressure</div>
                                    </div>
                                    <div className="about-stat">
                                        <div className="about-stat-value">∞</div>
                                        <div className="about-stat-label">Awareness</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CONTACT SECTION ========== */}
            <section className="contact-section" id="contact">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">Get in Touch</span>
                        <h2 className="section-title">Contact & <span>Support</span></h2>
                        <p className="section-subtitle">
                            Have questions or suggestions? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="contact-grid">
                        <div className="contact-info" data-aos="fade-right">
                            <h3>Reach Out To Us</h3>
                            <p style={{ marginTop: '8px', marginBottom: '0' }}>
                                Whether you have a question about our calculators or need guidance
                                on getting started, our team is here to help.
                            </p>
                            <div className="contact-info-cards">
                                <div className="contact-info-card">
                                    <div className="contact-info-icon"><FiMail /></div>
                                    <div>
                                        <div className="contact-info-label">Email</div>
                                        <div className="contact-info-value">support@finshield.in</div>
                                    </div>
                                </div>
                                <div className="contact-info-card">
                                    <div className="contact-info-icon"><FiPhone /></div>
                                    <div>
                                        <div className="contact-info-label">Phone</div>
                                        <div className="contact-info-value">+91 98765 43210</div>
                                    </div>
                                </div>
                                <div className="contact-info-card">
                                    <div className="contact-info-icon"><FaWhatsapp /></div>
                                    <div>
                                        <div className="contact-info-label">WhatsApp</div>
                                        <div className="contact-info-value">+91 98765 43210</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-card" data-aos="fade-left">
                            {contactSent ? (
                                <div className="contact-success">
                                    <div className="contact-success-icon"><FiCheckCircle /></div>
                                    <h3>Message Sent!</h3>
                                    <p>Thank you for reaching out. We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <>
                                    <h3>Send us a Message</h3>
                                    <p>Fill out the form below and we'll respond within 24 hours.</p>
                                    <form onSubmit={handleContactSubmit}>
                                        <div className="form-group">
                                            <label className="form-label">Your Name</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="Enter your full name"
                                                value={contactForm.name}
                                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="Enter your email"
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Your Message</label>
                                            <textarea
                                                className="form-textarea"
                                                placeholder="Type your message here..."
                                                value={contactForm.message}
                                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                            <FiSend /> Send Message
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
