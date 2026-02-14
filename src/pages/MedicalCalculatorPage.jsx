import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend
} from 'chart.js';
import {
    FiHeart, FiTrendingUp, FiDollarSign,
    FiAlertTriangle, FiCheckCircle, FiInfo
} from 'react-icons/fi';
import './CalculatorPages.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const formatCurrency = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakh`;
    return `₹${num.toLocaleString('en-IN')}`;
};

// Average treatment cost data for common medical procedures in India (in ₹)
const treatmentData = [
    { name: 'Heart Bypass Surgery', currentCost: 350000, fiveYear: 560000, tenYear: 900000, category: 'cardiac' },
    { name: 'Angioplasty', currentCost: 250000, fiveYear: 400000, tenYear: 640000, category: 'cardiac' },
    { name: 'Knee Replacement', currentCost: 300000, fiveYear: 480000, tenYear: 770000, category: 'ortho' },
    { name: 'Hip Replacement', currentCost: 350000, fiveYear: 560000, tenYear: 900000, category: 'ortho' },
    { name: 'Cancer Treatment (Avg)', currentCost: 500000, fiveYear: 800000, tenYear: 1280000, category: 'oncology' },
    { name: 'Kidney Dialysis (Annual)', currentCost: 360000, fiveYear: 576000, tenYear: 922000, category: 'renal' },
    { name: 'Kidney Transplant', currentCost: 500000, fiveYear: 800000, tenYear: 1280000, category: 'renal' },
    { name: 'C-Section Delivery', currentCost: 100000, fiveYear: 160000, tenYear: 256000, category: 'maternity' },
    { name: 'Normal Delivery', currentCost: 50000, fiveYear: 80000, tenYear: 128000, category: 'maternity' },
    { name: 'Cataract Surgery', currentCost: 40000, fiveYear: 64000, tenYear: 102000, category: 'eye' },
];

// Medical inflation data
const medicalInflationData = {
    general: 6.0,
    medical: 14.0,
    hospitalization: 15.5,
    medicines: 10.0,
    diagnostic: 12.0,
};

// Insurance coverage recommendations based on city tier
const coverageRecommendations = [
    { tier: 'Metro (Mumbai, Delhi, Bangalore)', minCover: 1000000, recommended: 2000000, ideal: 5000000 },
    { tier: 'Tier 1 (Pune, Hyderabad, Chennai)', minCover: 750000, recommended: 1500000, ideal: 3000000 },
    { tier: 'Tier 2 (Jaipur, Lucknow, Indore)', minCover: 500000, recommended: 1000000, ideal: 2000000 },
    { tier: 'Tier 3 / Rural', minCover: 300000, recommended: 500000, ideal: 1000000 },
];

const MedicalCalculatorPage = () => {
    const [age, setAge] = useState('');
    const [familySize, setFamilySize] = useState('');
    const [cityTier, setCityTier] = useState('');
    const [existingCoverage, setExistingCoverage] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [preExisting, setPreExisting] = useState('no');
    const [results, setResults] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const ageNum = parseInt(age) || 30;
        const family = parseInt(familySize) || 1;
        const income = parseFloat(monthlyIncome) || 0;
        const existing = parseFloat(existingCoverage) || 0;
        const annualIncome = income * 12;

        // Determine city tier multiplier
        let tierMultiplier = 1;
        let tierRec = coverageRecommendations[3]; // Default to Tier 3
        if (cityTier === 'metro') { tierMultiplier = 2.0; tierRec = coverageRecommendations[0]; }
        else if (cityTier === 'tier1') { tierMultiplier = 1.5; tierRec = coverageRecommendations[1]; }
        else if (cityTier === 'tier2') { tierMultiplier = 1.0; tierRec = coverageRecommendations[2]; }
        else { tierMultiplier = 0.7; tierRec = coverageRecommendations[3]; }

        // Age-based multiplier
        let ageMultiplier = 1;
        if (ageNum < 30) ageMultiplier = 0.8;
        else if (ageNum < 45) ageMultiplier = 1.0;
        else if (ageNum < 60) ageMultiplier = 1.5;
        else ageMultiplier = 2.0;

        // Pre-existing condition factor
        const preExistingFactor = preExisting === 'yes' ? 1.3 : 1.0;

        // Base coverage needed (₹5 lakh per family member as baseline)
        const baseCoverage = 500000 * family * tierMultiplier * ageMultiplier * preExistingFactor;

        // Recommended coverage (capped at reasonable amounts)
        const recommendedCoverage = Math.round(Math.max(baseCoverage, tierRec.recommended));

        // Premium estimate (rough: 2-4% of coverage based on age)
        let premiumRate = 0.02;
        if (ageNum >= 45) premiumRate = 0.03;
        if (ageNum >= 60) premiumRate = 0.05;
        if (preExisting === 'yes') premiumRate += 0.01;
        const estimatedPremium = Math.round(recommendedCoverage * premiumRate);
        const monthlyPremium = Math.round(estimatedPremium / 12);

        // Coverage gap
        const coverageGap = Math.max(recommendedCoverage - existing, 0);

        // Future medical cost (10 years, 14% medical inflation)
        const futureCostMultiplier = Math.pow(1.14, 10);
        const avgHospitalizationNow = 300000 * tierMultiplier;
        const avgHospitalizationFuture = Math.round(avgHospitalizationNow * futureCostMultiplier);

        // Premium as % of income
        const premiumToIncome = annualIncome > 0 ? ((estimatedPremium / annualIncome) * 100).toFixed(1) : 0;

        setResults({
            recommendedCoverage,
            existingCoverage: existing,
            coverageGap,
            estimatedPremium,
            monthlyPremium,
            avgHospitalizationNow,
            avgHospitalizationFuture,
            premiumToIncome,
            tierRec,
            ageNum,
        });
    };

    const handleReset = () => {
        setAge('');
        setFamilySize('');
        setCityTier('');
        setExistingCoverage('');
        setMonthlyIncome('');
        setPreExisting('no');
        setResults(null);
    };

    // Chart data
    const chartData = results ? {
        labels: ['Today', '5 Years', '10 Years'],
        datasets: [
            {
                label: 'Avg. Hospitalization Cost',
                data: [
                    results.avgHospitalizationNow,
                    Math.round(results.avgHospitalizationNow * Math.pow(1.14, 5)),
                    results.avgHospitalizationFuture,
                ],
                backgroundColor: ['rgba(255, 107, 0, 0.7)', 'rgba(255, 107, 0, 0.85)', 'rgba(220, 38, 38, 0.85)'],
                borderRadius: 8,
                barThickness: 50,
            }
        ],
    } : null;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => formatCurrency(ctx.raw),
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (val) => formatCurrency(val),
                },
                grid: { color: 'rgba(0,0,0,0.05)' },
            },
            x: {
                grid: { display: false },
            },
        },
    };

    return (
        <div className="calculator-page">
            <div className="page-header">
                <div className="container">
                    <h1 data-aos="fade-up">Medical Cost Calculator</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Estimate your health coverage needs based on your age, family size, city, and medical history.
                        Plan ahead for rising healthcare costs.
                    </p>
                </div>
            </div>

            {/* ========== CALCULATOR SECTION ========== */}
            <section className="calculator-section">
                <div className="container">
                    <div className="calculator-grid">
                        <div className="calculator-form-card" data-aos="fade-right">
                            <h3>🏥 Medical Coverage Calculator</h3>
                            <p>Enter your details to estimate the ideal health insurance coverage for your family.</p>
                            <form onSubmit={handleCalculate}>
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
                                    <label className="form-label">Family Members to Cover</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="e.g., 4"
                                        value={familySize}
                                        onChange={(e) => setFamilySize(e.target.value)}
                                        required
                                        min="1"
                                        max="10"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Monthly Household Income</label>
                                    <div className="input-with-prefix">
                                        <span className="input-prefix">₹</span>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 60000"
                                            value={monthlyIncome}
                                            onChange={(e) => setMonthlyIncome(e.target.value)}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">City Tier</label>
                                    <select
                                        className="form-select"
                                        value={cityTier}
                                        onChange={(e) => setCityTier(e.target.value)}
                                        required
                                    >
                                        <option value="">Select City Type</option>
                                        <option value="metro">Metro (Mumbai, Delhi, Bangalore)</option>
                                        <option value="tier1">Tier 1 (Pune, Hyderabad, Chennai)</option>
                                        <option value="tier2">Tier 2 (Jaipur, Lucknow, Indore)</option>
                                        <option value="tier3">Tier 3 / Rural</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Existing Health Insurance Coverage</label>
                                    <div className="input-with-prefix">
                                        <span className="input-prefix">₹</span>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 500000 (enter 0 if none)"
                                            value={existingCoverage}
                                            onChange={(e) => setExistingCoverage(e.target.value)}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Any Pre-existing Medical Conditions?</label>
                                    <select
                                        className="form-select"
                                        value={preExisting}
                                        onChange={(e) => setPreExisting(e.target.value)}
                                    >
                                        <option value="no">No — None</option>
                                        <option value="yes">Yes — I / family member has conditions</option>
                                    </select>
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                        <FiHeart /> Calculate Coverage
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
                                        <div className="result-item-icon"><FiHeart /></div>
                                        <div>
                                            <div className="result-item-label">Recommended Health Coverage</div>
                                            <div className="result-item-value">{formatCurrency(results.recommendedCoverage)}</div>
                                            <div className="result-item-sublabel">Based on age, family & city</div>
                                        </div>
                                    </div>

                                    <div className="result-card-item" data-aos="fade-up" data-aos-delay="100">
                                        <div className="result-item-icon"><FiDollarSign /></div>
                                        <div>
                                            <div className="result-item-label">Estimated Annual Premium</div>
                                            <div className="result-item-value">{formatCurrency(results.estimatedPremium)}</div>
                                            <div className="result-item-sublabel">
                                                ~{formatCurrency(results.monthlyPremium)}/month
                                                {results.premiumToIncome > 0 && ` (${results.premiumToIncome}% of income)`}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`result-card-item ${results.coverageGap > 0 ? 'primary' : ''}`} data-aos="fade-up" data-aos-delay="200">
                                        <div className="result-item-icon">
                                            {results.coverageGap > 0 ? <FiAlertTriangle /> : <FiCheckCircle />}
                                        </div>
                                        <div>
                                            <div className="result-item-label">Coverage Gap</div>
                                            <div className="result-item-value">{formatCurrency(results.coverageGap)}</div>
                                            <div className="result-item-sublabel">
                                                {results.coverageGap > 0
                                                    ? 'Additional coverage needed'
                                                    : 'You have sufficient coverage!'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="chart-container" data-aos="fade-up" data-aos-delay="300">
                                        <h3><FiTrendingUp style={{ verticalAlign: 'middle' }} /> Hospitalization Cost Projection</h3>
                                        <p style={{ fontSize: '0.88rem', color: 'var(--gray-400)', marginBottom: '16px' }}>
                                            Based on 14% annual medical inflation rate
                                        </p>
                                        <div style={{ height: '250px' }}>
                                            <Bar data={chartData} options={chartOptions} />
                                        </div>
                                    </div>

                                    <div className="result-explanation" data-aos="fade-up" data-aos-delay="400">
                                        <h4><FiInfo style={{ verticalAlign: 'middle' }} /> What This Means</h4>
                                        <p>
                                            {results.coverageGap > 0
                                                ? `Based on your profile, you need ${formatCurrency(results.recommendedCoverage)} of health coverage, but currently have ${formatCurrency(results.existingCoverage)}. The gap of ${formatCurrency(results.coverageGap)} leaves your family exposed to financial risk from hospitalization costs that are rising at 14% annually.`
                                                : `Great news! Your current health coverage of ${formatCurrency(results.existingCoverage)} meets or exceeds the recommended ${formatCurrency(results.recommendedCoverage)}. Continue reviewing your coverage annually as medical costs rise.`}
                                        </p>
                                        {results.ageNum >= 45 && (
                                            <p style={{ marginTop: '10px' }}>
                                                <strong>Age Advisory:</strong> At {results.ageNum}, consider adding critical illness coverage and super top-up plans. Premiums increase significantly after 50.
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏥</div>
                                    <h3 style={{ marginBottom: '8px' }}>Estimate Your Coverage</h3>
                                    <p>Fill in the form and click "Calculate Coverage" to see your recommended health insurance coverage.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== MEDICAL COST DATA SECTION ========== */}
            <section className="education-cost-data">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">Medical Cost Data</span>
                        <h2 className="section-title">Treatment Costs & <span>Medical Inflation</span></h2>
                        <p className="section-subtitle">
                            Understanding how healthcare costs are rising helps you plan the right coverage amount.
                        </p>
                    </div>

                    <div className="education-tables-grid" data-aos="fade-up" data-aos-delay="100">
                        {/* Sidebar: Inflation + Coverage Recommendations */}
                        <div className="education-tables-sidebar">
                            {/* Medical Inflation Rates */}
                            <div className="education-table-card">
                                <h4 className="education-table-title">📈 Medical Inflation Rates</h4>
                                <table className="education-styled-table compact-table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Annual Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(medicalInflationData).map(([key, rate], index) => (
                                            <tr key={key} className={index % 2 === 0 ? 'row-even' : ''}>
                                                <td className="course-name-cell" style={{ textTransform: 'capitalize' }}>
                                                    {key === 'general' ? 'General Inflation' : key.charAt(0).toUpperCase() + key.slice(1)}
                                                </td>
                                                <td className={rate >= 14 ? 'highlight-cell' : 'amount-cell'}>
                                                    {rate}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Coverage by City Tier */}
                            <div className="education-table-card">
                                <h4 className="education-table-title">🏙️ Recommended Coverage by City</h4>
                                <table className="education-styled-table compact-table">
                                    <thead>
                                        <tr>
                                            <th>City Tier</th>
                                            <th>Minimum</th>
                                            <th>Recommended</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coverageRecommendations.map((rec, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'row-even' : ''}>
                                                <td className="course-name-cell">{rec.tier}</td>
                                                <td>{formatCurrency(rec.minCover)}</td>
                                                <td className="amount-cell">{formatCurrency(rec.recommended)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Key Takeaway */}
                            <div className="education-table-card key-takeaway-card">
                                <h4 className="education-table-title">💡 Key Takeaway</h4>
                                <p>
                                    Medical costs in India are rising at <strong>14% annually</strong> — nearly
                                    2.3x the general inflation rate. A hospitalization costing ₹3 lakhs today
                                    will cost over <strong>₹11 lakhs in 10 years</strong>. Getting adequate
                                    health coverage today is the smartest financial decision for your family.
                                </p>
                            </div>
                        </div>

                        {/* Main Table: Treatment Costs */}
                        <div className="education-table-card course-table-card">
                            <h4 className="education-table-title">🏥 Common Treatment Costs (Projected)</h4>
                            <p className="table-subtitle">How today's medical treatment costs will grow over time</p>
                            <div className="table-scroll-wrapper">
                                <table className="education-styled-table course-projection-table">
                                    <thead>
                                        <tr>
                                            <th>Treatment</th>
                                            <th>Today (₹)</th>
                                            <th>5 Years Later</th>
                                            <th>10 Years Later</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {treatmentData.map((treatment, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'row-even' : ''}>
                                                <td className="course-name-cell" data-label="Treatment">{treatment.name}</td>
                                                <td data-label="Today (₹)">{formatCurrency(treatment.currentCost)}</td>
                                                <td data-label="5 Years Later">{formatCurrency(treatment.fiveYear)}</td>
                                                <td className="future-cost-cell" data-label="10 Years Later">{formatCurrency(treatment.tenYear)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== INFO SECTION ========== */}
            <section className="info-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">Smart Health Planning</span>
                        <h2 className="section-title">Tips to <span>Reduce Medical Costs</span></h2>
                    </div>
                    <div className="info-cards">
                        <div className="info-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="info-card-number">1</div>
                            <h4>Buy Early, Save More</h4>
                            <p>A 25-year-old pays ~₹8,000/year for ₹10L cover. The same plan at 45 costs ₹20,000+. Start early to lock in lower premiums.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="info-card-number">2</div>
                            <h4>Super Top-Up Plans</h4>
                            <p>Add a ₹25-50 lakh super top-up for just ₹3,000-5,000/year. It activates when your base plan is exhausted — best value protection.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="info-card-number">3</div>
                            <h4>Tax Benefits (80D)</h4>
                            <p>Claim up to ₹25,000 deduction for self/family, plus ₹50,000 for senior citizen parents. That's ₹75,000 total tax savings annually.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="info-card-number">4</div>
                            <h4>Review Annually</h4>
                            <p>Medical inflation means your ₹5L cover today may feel like ₹2.5L in 5 years. Upgrade coverage every 2-3 years to stay protected.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MedicalCalculatorPage;
