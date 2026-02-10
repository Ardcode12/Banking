import React, { useState } from 'react';
import {
    FiHeart, FiActivity, FiAlertCircle,
    FiShield, FiClock, FiCheckCircle, FiInfo
} from 'react-icons/fi';
import './CalculatorPages.css';

const HealthInsurancePage = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [medicalConditions, setMedicalConditions] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const getAgeInsight = () => {
        const ageNum = parseInt(age);
        if (ageNum < 30) return "You're in a great position to get affordable health insurance. Premiums are lowest for younger individuals.";
        if (ageNum < 45) return "This is an ideal time to secure comprehensive health coverage. Premiums increase significantly after 45.";
        if (ageNum < 60) return "Health insurance becomes critical at this age. Consider higher coverage amounts and critical illness riders.";
        return "Senior citizen health plans are essential. Look for plans with no co-payment clauses and high coverage limits.";
    };

    return (
        <div className="calculator-page">
            <div className="page-header">
                <div className="container">
                    <h1 data-aos="fade-up">Health Insurance Awareness</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Understand why health insurance matters and how your health profile impacts your coverage needs.
                    </p>
                </div>
            </div>

            <section className="calculator-section">
                <div className="container">
                    <div className="health-content-grid">
                        <div>
                            <div className="calculator-form-card" data-aos="fade-right">
                                <h3>🏥 Your Health Profile</h3>
                                <p>Enter your details to get personalized health insurance awareness.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Your Age</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 30"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            required
                                            min="18"
                                            max="100"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Gender</label>
                                        <select
                                            className="form-select"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Existing Medical Conditions</label>
                                        <select
                                            className="form-select"
                                            value={medicalConditions}
                                            onChange={(e) => setMedicalConditions(e.target.value)}
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="no">No — I have no pre-existing conditions</option>
                                            <option value="yes">Yes — I have pre-existing conditions</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                        <FiHeart /> Get Insights
                                    </button>
                                </form>
                            </div>

                            {submitted && (
                                <div className="health-awareness-note" data-aos="fade-up" style={{ marginTop: '24px' }}>
                                    <h4><FiInfo style={{ verticalAlign: 'middle' }} /> Personalized Insight</h4>
                                    <p>{getAgeInsight()}</p>
                                    {medicalConditions === 'yes' && (
                                        <p style={{ marginTop: '12px' }}>
                                            <strong>Pre-existing conditions:</strong> If you have pre-existing medical conditions,
                                            health insurance is even more important. Many plans have a waiting period
                                            of 2-4 years for pre-existing conditions. Getting covered early ensures you're
                                            protected when you need it most.
                                        </p>
                                    )}
                                    <p style={{ marginTop: '12px', fontStyle: 'italic', fontSize: '0.85rem' }}>
                                        ⚠️ This is general awareness information only. Please consult a qualified
                                        insurance advisor or medical professional for personalized advice.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="section-header" style={{ textAlign: 'left', marginBottom: '30px' }} data-aos="fade-left">
                                <span className="section-badge">Why It Matters</span>
                                <h2>Why Health Insurance is <span className="text-primary">Important</span></h2>
                                <p className="section-subtitle" style={{ margin: 0 }}>
                                    Medical costs in India are rising at 15% annually. A single hospitalization
                                    can drain years of savings without adequate coverage.
                                </p>
                            </div>

                            <div className="health-topics" data-aos="fade-left" data-aos-delay="100">
                                <div className="health-topic">
                                    <div className="health-topic-icon"><FiShield /></div>
                                    <div>
                                        <h4>Financial Protection</h4>
                                        <p>Health insurance shields your savings from unexpected medical expenses. An average hospital stay in India costs ₹2-5 lakhs.</p>
                                    </div>
                                </div>

                                <div className="health-topic">
                                    <div className="health-topic-icon"><FiClock /></div>
                                    <div>
                                        <h4>Age Matters</h4>
                                        <p>Insurance premiums increase with age. Buying a policy at 25 can cost 40% less than buying the same policy at 40.</p>
                                    </div>
                                </div>

                                <div className="health-topic">
                                    <div className="health-topic-icon"><FiActivity /></div>
                                    <div>
                                        <h4>Medical History Impact</h4>
                                        <p>Pre-existing conditions may lead to higher premiums or waiting periods. Disclosing your medical history truthfully ensures claim acceptance.</p>
                                    </div>
                                </div>

                                <div className="health-topic">
                                    <div className="health-topic-icon"><FiAlertCircle /></div>
                                    <div>
                                        <h4>Rising Healthcare Costs</h4>
                                        <p>Medical inflation in India is 15% per year — nearly double the general inflation rate. What costs ₹5 lakhs today may cost ₹20 lakhs in 10 years.</p>
                                    </div>
                                </div>

                                <div className="health-topic">
                                    <div className="health-topic-icon"><FiCheckCircle /></div>
                                    <div>
                                        <h4>Tax Benefits</h4>
                                        <p>Health insurance premiums qualify for tax deduction under Section 80D — up to ₹25,000 for self and ₹50,000 for senior citizen parents.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">General Awareness</span>
                        <h2 className="section-title">Key Things to <span>Remember</span></h2>
                    </div>
                    <div className="info-cards">
                        <div className="info-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="info-card-number">1</div>
                            <h4>Start Early</h4>
                            <p>The younger you are, the lower your premium. Don't wait for a health scare to get insured.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="info-card-number">2</div>
                            <h4>Cover Your Family</h4>
                            <p>Family floater plans provide cost-effective coverage for your entire family under one policy.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="info-card-number">3</div>
                            <h4>Review Annually</h4>
                            <p>As your family grows and medical costs rise, review and upgrade your health coverage every year.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HealthInsurancePage;
