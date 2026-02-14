import React, { useState } from 'react';
import { FiShield, FiDollarSign, FiAlertTriangle, FiCheckCircle, FiInfo, FiHome, FiTrendingUp } from 'react-icons/fi';
import './CalculatorPages.css';

const formatCurrency = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakh`;
    return `₹${num.toLocaleString('en-IN')}`;
};

const LifeInsurancePage = () => {
    const [annualIncome, setAnnualIncome] = useState('');
    const [workingYears, setWorkingYears] = useState('');
    const [existingCoverage, setExistingCoverage] = useState('');
    const [results, setResults] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const income = parseFloat(annualIncome) || 0;
        const years = parseFloat(workingYears) || 0;
        const existing = parseFloat(existingCoverage) || 0;

        const hlv = income * years;
        const gap = Math.max(hlv - existing, 0);

        setResults({ hlv, existing, gap });
    };

    const handleReset = () => {
        setAnnualIncome('');
        setWorkingYears('');
        setExistingCoverage('');
        setResults(null);
    };

    return (
        <div className="calculator-page">
            <div className="page-header">
                <div className="container">
                    <h1 data-aos="fade-up">Life Insurance Calculator</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Calculate your Human Life Value (HLV) and identify the insurance coverage gap to protect your family's future.
                    </p>
                </div>
            </div>

            <section className="calculator-section">
                <div className="container">
                    <div className="calculator-grid">
                        <div className="calculator-form-card" data-aos="fade-right">
                            <h3>📊 HLV Calculator</h3>
                            <p>Enter your details below to calculate your coverage requirement.</p>
                            <form onSubmit={handleCalculate}>
                                <div className="form-group">
                                    <label className="form-label">Annual Income</label>
                                    <div className="input-with-prefix">
                                        <span className="input-prefix">₹</span>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 1000000"
                                            value={annualIncome}
                                            onChange={(e) => setAnnualIncome(e.target.value)}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Remaining Working Years</label>
                                    <div className="input-with-prefix">
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 20"
                                            value={workingYears}
                                            onChange={(e) => setWorkingYears(e.target.value)}
                                            required
                                            min="1"
                                            max="50"
                                        />
                                        <span className="input-suffix">years</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Existing Life Insurance Coverage</label>
                                    <div className="input-with-prefix">
                                        <span className="input-prefix">₹</span>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 5000000"
                                            value={existingCoverage}
                                            onChange={(e) => setExistingCoverage(e.target.value)}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                        <FiShield /> Calculate HLV
                                    </button>
                                    <button type="button" className="btn btn-outline" onClick={handleReset}>
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="results-container" data-aos="fade-left">
                            {results ? (
                                <>
                                    <div className="result-card-item" data-aos="fade-up">
                                        <div className="result-item-icon"><FiDollarSign /></div>
                                        <div>
                                            <div className="result-item-label">Total Human Life Value (HLV)</div>
                                            <div className="result-item-value">{formatCurrency(results.hlv)}</div>
                                            <div className="result-item-sublabel">Annual Income × Working Years</div>
                                        </div>
                                    </div>

                                    <div className="result-card-item" data-aos="fade-up" data-aos-delay="100">
                                        <div className="result-item-icon"><FiCheckCircle /></div>
                                        <div>
                                            <div className="result-item-label">Existing Insurance Coverage</div>
                                            <div className="result-item-value">{formatCurrency(results.existing)}</div>
                                            <div className="result-item-sublabel">Your current life insurance</div>
                                        </div>
                                    </div>

                                    <div className="result-card-item primary" data-aos="fade-up" data-aos-delay="200">
                                        <div className="result-item-icon">
                                            {results.gap > 0 ? <FiAlertTriangle /> : <FiCheckCircle />}
                                        </div>
                                        <div>
                                            <div className="result-item-label">Additional Coverage Required</div>
                                            <div className="result-item-value">{formatCurrency(results.gap)}</div>
                                            <div className="result-item-sublabel">
                                                {results.gap > 0 ? 'Coverage gap identified' : 'You are well covered!'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="result-explanation" data-aos="fade-up" data-aos-delay="300">
                                        <h4><FiInfo style={{ verticalAlign: 'middle' }} /> What This Means</h4>
                                        <p>
                                            {results.gap > 0
                                                ? `Your current life insurance coverage may not be sufficient to protect your family's future. The additional coverage of ${formatCurrency(results.gap)} represents the financial gap your family may face in case of an unexpected event. Consider reviewing your insurance portfolio to ensure adequate protection.`
                                                : 'Great news! Your current life insurance coverage appears to meet or exceed your calculated Human Life Value. Continue to review your coverage periodically as your income and circumstances change.'}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛡️</div>
                                    <h3 style={{ marginBottom: '8px' }}>Calculate Your HLV</h3>
                                    <p>Fill in the form and click "Calculate HLV" to see your results here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== WHY LIFE INSURANCE IS IMPORTANT ========== */}
            <section className="education-cost-data">
                <div className="container">
                    <div className="health-content-grid">
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div className="section-header" style={{ textAlign: 'left', marginBottom: '30px' }} data-aos="fade-right">
                                <span className="section-badge">Why It Matters</span>
                                <h2>Why Life Insurance is <span className="text-primary">Important</span></h2>
                                <p className="section-subtitle" style={{ margin: 0 }}>
                                    Life insurance acts as a fundamental safety net for your family. It ensures that your
                                    financial goals are met even in your absence.
                                </p>
                            </div>
                            <div className="topic-card" style={{ marginBottom: '20px', borderLeft: '4px solid var(--primary)' }} data-aos="fade-right" data-aos-delay="100">
                                <div>
                                    <h4>Peace of Mind</h4>
                                    <p style={{ margin: 0 }}>Knowing your family is financially secure brings immense peace of mind, allowing you to focus on living your life to the fullest.</p>
                                </div>
                            </div>
                        </div>

                        <div className="health-topics" data-aos="fade-left" data-aos-delay="100">
                            <div className="topic-card">
                                <div className="topic-card-icon"><FiShield /></div>
                                <div>
                                    <h4>Financial Protection</h4>
                                    <p>Replaces your income to help your family maintain their standard of living and pay for daily expenses in your absence.</p>
                                </div>
                            </div>

                            <div className="topic-card">
                                <div className="topic-card-icon"><FiHome /></div>
                                <div>
                                    <h4>Debt & Liability Cover</h4>
                                    <p>Prevents the burden of outstanding home loans, car loans, and other debts from falling on your family members.</p>
                                </div>
                            </div>

                            <div className="topic-card">
                                <div className="topic-card-icon"><FiDollarSign /></div>
                                <div>
                                    <h4>Child's Future Security</h4>
                                    <p>Ensures that your children's higher education and marriage goals are achieved as planned, regardless of uncertainties.</p>
                                </div>
                            </div>

                            <div className="topic-card">
                                <div className="topic-card-icon"><FiTrendingUp /></div>
                                <div>
                                    <h4>Long-term Wealth Creation</h4>
                                    <p>Certain life insurance policies (like ULIPs or Endowment plans) help you build a corpus over time while providing cover.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">How It Works</span>
                        <h2 className="section-title">Understanding <span>Human Life Value</span></h2>
                    </div>
                    <div className="info-cards">
                        <div className="info-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="info-card-number">1</div>
                            <h4>Enter Your Income</h4>
                            <p>Provide your current annual income — the earning potential you want to replace.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="info-card-number">2</div>
                            <h4>Working Years Left</h4>
                            <p>How many more years you plan to work. This multiplies your income to get total HLV.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="info-card-number">3</div>
                            <h4>Identify the Gap</h4>
                            <p>Your HLV minus existing coverage reveals how much additional insurance you may need.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LifeInsurancePage;
