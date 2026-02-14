import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiShield, FiTrendingUp, FiHeart,
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

            {/* ========== WHAT IS LIFE INSURANCE ========== */}
            <section className="service-detail" data-aos="fade-up">
                <div className="container">
                    <div className="service-detail-grid">
                        <div className="service-detail-icon-box">
                            <FiShield />
                        </div>
                        <div className="service-detail-content">
                            <span className="section-badge">Understanding Insurance</span>
                            <h2>What is <span className="text-primary">Life Insurance</span>?</h2>
                            <p>
                                Life insurance is a contract between you and an insurance company where you pay regular
                                premiums, and in return, the insurer pays a lump sum (sum assured) to your family in case of
                                your untimely demise. It acts as a financial safety net, ensuring your loved ones can maintain
                                their standard of living, pay off debts, and meet future goals even in your absence.
                            </p>
                            <div className="service-detail-points">
                                <div className="service-point"><FiCheckCircle /> <span>Replaces your income to support your family</span></div>
                                <div className="service-point"><FiCheckCircle /> <span>Covers home loans, debts & liabilities</span></div>
                                <div className="service-point"><FiCheckCircle /> <span>Secures children's education & marriage expenses</span></div>
                                <div className="service-point"><FiCheckCircle /> <span>Tax benefits under Section 80C (up to ₹1.5 lakh)</span></div>
                            </div>
                            <Link to="/life-insurance" className="btn btn-primary">
                                <FiShield /> Calculate Your Coverage
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== WHAT IS HEALTH INSURANCE ========== */}
            <section className="service-detail alt-bg" data-aos="fade-up">
                <div className="container">
                    <div className="service-detail-grid reverse">
                        <div className="service-detail-icon-box health">
                            <FiHeart />
                        </div>
                        <div className="service-detail-content">
                            <span className="section-badge">Healthcare Protection</span>
                            <h2>What is <span className="text-primary">Health Insurance</span>?</h2>
                            <p>
                                Health insurance covers your medical expenses during hospitalization, surgeries, and
                                treatments. With medical inflation in India running at 14% annually — nearly double the
                                general inflation rate — a single hospitalization costing ₹3 lakhs today could cost over
                                ₹11 lakhs in 10 years. Health insurance ensures you get the best treatment without
                                draining your life savings.
                            </p>
                            <div className="service-detail-points">
                                <div className="service-point"><FiCheckCircle /> <span>Covers hospitalization, surgery & treatment costs</span></div>
                                <div className="service-point"><FiCheckCircle /> <span>Cashless treatment at 5,000+ network hospitals</span></div>
                                <div className="service-point"><FiCheckCircle /> <span>Pre & post hospitalization expenses covered</span></div>
                                <div className="service-point"><FiCheckCircle /> <span>Tax savings under Section 80D (up to ₹75,000)</span></div>
                            </div>
                            <Link to="/health-insurance" className="btn btn-primary">
                                <FiHeart /> Learn About Coverage
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* ========== FINANCIAL PLANNING GUIDE SECTION ========== */}
            <section className="financial-planning-guide">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">Practical Guide</span>
                        <h2 className="section-title">Smart Financial <span>Planning Example</span></h2>
                        <p className="section-subtitle">
                            A comprehensive financial plan for a young family with monthly income of ₹60,000
                        </p>
                    </div>

                    <div className="financial-guide-content" data-aos="fade-up" data-aos-delay="200">
                        <img
                            src="/images/smart-financial-plan.jpg"
                            alt="Smart Financial Plan for Young Family - Monthly Income ₹60,000"
                            className="financial-plan-image"
                        />
                        <div className="financial-guide-highlights">
                            <div className="financial-highlight-item">
                                <div className="financial-highlight-icon">🛡️</div>
                                <div>
                                    <h4>Protection First</h4>
                                    <p>Term insurance (₹1 Cr) + Health insurance (5-10 lakhs)</p>
                                </div>
                            </div>
                            <div className="financial-highlight-item">
                                <div className="financial-highlight-icon">�</div>
                                <div>
                                    <h4>Child's Future</h4>
                                    <p>₹3,000/month SIP for higher education in 15 years</p>
                                </div>
                            </div>
                            <div className="financial-highlight-item">
                                <div className="financial-highlight-icon">💰</div>
                                <div>
                                    <h4>Emergency Fund</h4>
                                    <p>₹2 lakhs in liquid funds for job loss or medical crisis</p>
                                </div>
                            </div>
                            <div className="financial-highlight-item">
                                <div className="financial-highlight-icon">🏡</div>
                                <div>
                                    <h4>Short-Term Goals</h4>
                                    <p>Save ₹4,000-5,000/month for home/vehicle downpayment</p>
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
