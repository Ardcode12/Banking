import React from 'react';
import { FiAlertCircle, FiLock, FiDatabase, FiCheckCircle } from 'react-icons/fi';
import './LegalPage.css';

const LegalPage = () => {
    return (
        <div className="legal-page">
            <div className="page-header">
                <div className="container">
                    <h1 data-aos="fade-up">Legal & Disclaimer</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Important information about how this platform works and your rights.
                    </p>
                </div>
            </div>

            <section className="legal-section">
                <div className="container">
                    <div className="legal-content">
                        {/* Disclaimer */}
                        <div className="legal-card" data-aos="fade-up">
                            <div className="legal-card-header">
                                <div className="legal-card-icon"><FiAlertCircle /></div>
                                <h2>Disclaimer</h2>
                            </div>
                            <p>
                                The information, calculators, and tools provided on FinShield are intended
                                for <strong>educational and informational purposes only</strong>. They should
                                not be considered as professional financial advice, insurance advice, tax advice,
                                or investment advice.
                            </p>
                            <ul>
                                <li>
                                    <FiCheckCircle />
                                    All calculations are <strong>estimates only</strong> and may not reflect
                                    actual costs, returns, or insurance requirements.
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    This platform does <strong>not sell, promote, or endorse</strong> any specific
                                    insurance product, financial product, or investment scheme.
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    We are <strong>not a licensed financial advisor</strong>, insurance broker,
                                    or investment consultant.
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    Users should consult qualified professionals for personalized financial planning
                                    and insurance decisions.
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    The calculations are based on simplified formulas and assumptions. Actual outcomes
                                    may vary based on market conditions, policy terms, and individual circumstances.
                                </li>
                            </ul>
                            <p>
                                By using this website, you acknowledge that you understand and agree to this
                                disclaimer. FinShield and its creators shall not be held liable for any decisions
                                made based on the information provided on this platform.
                            </p>
                        </div>

                        {/* Privacy Policy */}
                        <div className="legal-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="legal-card-header">
                                <div className="legal-card-icon"><FiLock /></div>
                                <h2>Privacy Policy</h2>
                            </div>
                            <p>
                                Your privacy is important to us. This privacy policy explains how we handle
                                any information you provide while using our platform.
                            </p>

                            <h3>Information We Collect</h3>
                            <p>
                                We may collect the following information when you voluntarily provide it through
                                our contact form:
                            </p>
                            <ul>
                                <li><FiCheckCircle /> Name and email address (contact form only)</li>
                                <li><FiCheckCircle /> Messages or queries submitted through the contact form</li>
                            </ul>

                            <h3>Information We Do NOT Collect</h3>
                            <ul>
                                <li><FiCheckCircle /> Calculator inputs are processed locally in your browser and are <strong>not sent to any server</strong></li>
                                <li><FiCheckCircle /> We do not collect financial data, income details, or insurance policy information</li>
                                <li><FiCheckCircle /> We do not use cookies for tracking or advertising</li>
                            </ul>

                            <h3>How We Use Information</h3>
                            <p>
                                Any information collected through the contact form is used solely for the
                                purpose of responding to your inquiry. We do not sell, share, or distribute
                                your personal information to any third party.
                            </p>
                        </div>

                        {/* Data Usage */}
                        <div className="legal-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="legal-card-header">
                                <div className="legal-card-icon"><FiDatabase /></div>
                                <h2>Data Usage & Security</h2>
                            </div>
                            <p>
                                We take data security seriously and have implemented the following measures:
                            </p>
                            <ul>
                                <li>
                                    <FiCheckCircle />
                                    All calculator computations happen <strong>entirely in your browser</strong>.
                                    No financial data is transmitted or stored on our servers.
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    We use <strong>HTTPS encryption</strong> to secure any data transmitted
                                    between your browser and our website.
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    We do not use analytics or tracking tools that could compromise your privacy.
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    You can use all calculators without providing any personal identification
                                    information.
                                </li>
                            </ul>

                            <h3>Third-Party Links</h3>
                            <p>
                                This website may contain links to external websites. We are not responsible
                                for the privacy practices or content of these external sites. We encourage
                                you to review the privacy policies of any external websites you visit.
                            </p>

                            <h3>Changes to This Policy</h3>
                            <p>
                                We may update this privacy policy from time to time. Any changes will be
                                posted on this page with an updated revision date.
                            </p>
                        </div>

                        <p className="legal-last-updated" data-aos="fade-up">
                            Last updated: February 2026
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LegalPage;
