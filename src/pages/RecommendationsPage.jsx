import React from 'react';
import { Link } from 'react-router-dom';
import {
    FiShield, FiBookOpen, FiHeart, FiTrendingUp,
    FiCheckCircle, FiTarget, FiArrowRight
} from 'react-icons/fi';
import './RecommendationsPage.css';

const RecommendationsPage = () => {
    return (
        <div className="recommendations-page">
            <div className="page-header">
                <div className="container">
                    <h1 data-aos="fade-up">Recommendations</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Actionable guidance to help you strengthen your family's financial safety net.
                    </p>
                </div>
            </div>

            <section className="rec-section">
                <div className="container">
                    <div className="rec-hero" data-aos="fade-up">
                        <div className="rec-hero-icon"><FiTarget /></div>
                        <h2>Based on Your Inputs</h2>
                        <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--gray-400)', fontSize: '1.05rem' }}>
                            Planning early and increasing coverage can help protect your family's long-term
                            financial goals. Here are our key recommendations.
                        </p>
                    </div>

                    <div className="rec-cards">
                        {/* Life Insurance */}
                        <div className="rec-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="rec-card-icon"><FiShield /></div>
                            <h3>Adequate Life Insurance</h3>
                            <p>
                                Your life insurance should cover at least 10-15 times your annual income to
                                ensure your family can maintain their lifestyle and meet financial obligations.
                            </p>
                            <ul className="rec-card-list">
                                <li><FiCheckCircle /> Calculate your Human Life Value (HLV)</li>
                                <li><FiCheckCircle /> Identify any coverage gap</li>
                                <li><FiCheckCircle /> Consider term insurance for high coverage at low cost</li>
                                <li><FiCheckCircle /> Review and update coverage as income grows</li>
                            </ul>
                        </div>

                        {/* Health Insurance */}
                        <div className="rec-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="rec-card-icon"><FiHeart /></div>
                            <h3>Health Insurance Priority</h3>
                            <p>
                                Medical emergencies are the #1 cause of financial distress in India. A robust
                                health insurance plan is not optional — it's essential.
                            </p>
                            <ul className="rec-card-list">
                                <li><FiCheckCircle /> Minimum ₹10 lakh cover for family</li>
                                <li><FiCheckCircle /> Buy early for lower premiums</li>
                                <li><FiCheckCircle /> Consider super top-up plans for extra coverage</li>
                                <li><FiCheckCircle /> Declare pre-existing conditions honestly</li>
                            </ul>
                        </div>

                        {/* Education Planning */}
                        <div className="rec-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="rec-card-icon"><FiBookOpen /></div>
                            <h3>Education Planning</h3>
                            <p>
                                Education costs are rising 7-10% annually. Starting early is the key to
                                building a sufficient education corpus without financial stress.
                            </p>
                            <ul className="rec-card-list">
                                <li><FiCheckCircle /> Start SIPs in equity mutual funds early</li>
                                <li><FiCheckCircle /> Use our calculator to estimate future costs</li>
                                <li><FiCheckCircle /> Consider education-specific savings plans</li>
                                <li><FiCheckCircle /> Factor in inflation when setting targets</li>
                            </ul>
                        </div>

                        {/* Inflation */}
                        <div className="rec-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="rec-card-icon"><FiTrendingUp /></div>
                            <h3>Beat Inflation</h3>
                            <p>
                                Money in a savings account loses value over time. Ensure your investments
                                earn returns higher than the inflation rate.
                            </p>
                            <ul className="rec-card-list">
                                <li><FiCheckCircle /> Diversify investments across asset classes</li>
                                <li><FiCheckCircle /> Equity investments for long-term goals (7+ years)</li>
                                <li><FiCheckCircle /> Debt funds for short-term stability</li>
                                <li><FiCheckCircle /> Avoid keeping large amounts idle in savings</li>
                            </ul>
                        </div>

                        {/* Emergency Fund */}
                        <div className="rec-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="rec-card-icon"><FiTarget /></div>
                            <h3>Emergency Fund</h3>
                            <p>
                                Before investing, build an emergency fund equal to 6-12 months of monthly
                                expenses. This provides a safety net for the unexpected.
                            </p>
                            <ul className="rec-card-list">
                                <li><FiCheckCircle /> Keep 6-12 months of expenses in liquid funds</li>
                                <li><FiCheckCircle /> This should be easily accessible</li>
                                <li><FiCheckCircle /> Don't use it for investments or planned expenses</li>
                                <li><FiCheckCircle /> Replenish immediately after any withdrawal</li>
                            </ul>
                        </div>

                        {/* Regular Review */}
                        <div className="rec-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="rec-card-icon"><FiCheckCircle /></div>
                            <h3>Annual Review</h3>
                            <p>
                                Your financial plan should evolve with your life. Conduct an annual review
                                to ensure everything stays on track.
                            </p>
                            <ul className="rec-card-list">
                                <li><FiCheckCircle /> Review insurance coverage annually</li>
                                <li><FiCheckCircle /> Rebalance investment portfolio</li>
                                <li><FiCheckCircle /> Update nominees and beneficiaries</li>
                                <li><FiCheckCircle /> Adjust for life events (marriage, children, etc.)</li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="rec-cta-banner" data-aos="zoom-in">
                        <h2>Ready to Take Action?</h2>
                        <p>
                            Use our free calculators to understand your exact financial gaps and start
                            planning for a secure future today.
                        </p>
                        <div className="rec-cta-buttons">
                            <Link to="/life-insurance" className="btn btn-white btn-lg">
                                <FiShield /> Life Insurance Calculator <FiArrowRight />
                            </Link>
                            <Link to="/education-calculator" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                                <FiBookOpen /> Education Planner <FiArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RecommendationsPage;
