import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend
} from 'chart.js';
import { FiBookOpen, FiTrendingUp, FiCalendar, FiInfo } from 'react-icons/fi';
import './CalculatorPages.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const formatCurrency = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakh`;
    return `₹${num.toLocaleString('en-IN')}`;
};

// Course data extracted from education cost inflation data
const courseData = [
    { name: 'Engineering', currentCost: 400000, fiveYear: 600000, tenYear: 1000000, fifteenYear: 1700000 },
    { name: 'Doctor / Medical', currentCost: 2500000, fiveYear: 4000000, tenYear: 6400000, fifteenYear: 10400000 },
    { name: 'MBA', currentCost: 300000, fiveYear: 500000, tenYear: 700000, fifteenYear: 1200000 },
    { name: 'Foreign Study', currentCost: 1000000, fiveYear: 1600000, tenYear: 2600000, fifteenYear: 4100000 },
    { name: 'C.A.', currentCost: 500000, fiveYear: 800000, tenYear: 1300000, fifteenYear: 2100000 },
    { name: 'Architecture', currentCost: 400000, fiveYear: 600000, tenYear: 1000000, fifteenYear: 1700000 },
    { name: 'Nano Technology', currentCost: 600000, fiveYear: 900000, tenYear: 1500000, fifteenYear: 2500000 },
    { name: 'Research', currentCost: 800000, fiveYear: 1200000, tenYear: 2000000, fifteenYear: 3300000 },
    { name: 'Aeronautics', currentCost: 700000, fiveYear: 1100000, tenYear: 1800000, fifteenYear: 2900000 },
    { name: 'Arts & Sports', currentCost: 200000, fiveYear: 300000, tenYear: 500000, fifteenYear: 800000 },
];

// Top college data
const collegeData = [
    { name: 'BITS', place: 'Pilani', amount: 1100000 },
    { name: 'IIT', place: 'Kanpur', amount: 800000 },
    { name: 'HIT', place: 'Hyderabad', amount: 800000 },
    { name: 'CMC', place: 'Vellore', amount: 3000000 },
    { name: 'Ramachandra', place: 'Chennai', amount: 2500000 },
    { name: 'IIM', place: 'Hyderabad', amount: 900000 },
];

// Helper: interpolate future cost from courseData based on years remaining
const getFutureCostFromCourseData = (course, years) => {
    if (!course) return null;
    const dataPoints = [
        { year: 0, cost: course.currentCost },
        { year: 5, cost: course.fiveYear },
        { year: 10, cost: course.tenYear },
        { year: 15, cost: course.fifteenYear },
    ];

    if (years <= 0) return course.currentCost;
    if (years >= 15) {
        // Extrapolate beyond 15 years using the 10->15 year growth rate
        const growthRate = Math.pow(course.fifteenYear / course.tenYear, 1 / 5);
        return Math.round(course.fifteenYear * Math.pow(growthRate, years - 15));
    }

    // Find the two surrounding data points and interpolate
    for (let i = 0; i < dataPoints.length - 1; i++) {
        if (years >= dataPoints[i].year && years <= dataPoints[i + 1].year) {
            const fraction = (years - dataPoints[i].year) / (dataPoints[i + 1].year - dataPoints[i].year);
            // Use exponential interpolation for more realistic inflation curves
            const startCost = dataPoints[i].cost;
            const endCost = dataPoints[i + 1].cost;
            const yearSpan = dataPoints[i + 1].year - dataPoints[i].year;
            const growthRate = Math.pow(endCost / startCost, 1 / yearSpan);
            return Math.round(startCost * Math.pow(growthRate, years - dataPoints[i].year));
        }
    }
    return course.currentCost;
};

const EducationCalculatorPage = () => {
    const [childAge, setChildAge] = useState('');
    const [collegeAge, setCollegeAge] = useState('');
    const [currentCost, setCurrentCost] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [inflationRate, setInflationRate] = useState(7);
    const [results, setResults] = useState(null);
    const chartRef = useRef(null);

    const handleCourseChange = (e) => {
        const courseName = e.target.value;
        setSelectedCourse(courseName);
        if (courseName) {
            const course = courseData.find(c => c.name === courseName);
            if (course) {
                setCurrentCost(course.currentCost.toString());
                setInflationRate(10);
            }
        }
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        const cAge = parseFloat(childAge) || 0;
        const colAge = parseFloat(collegeAge) || 0;
        const cost = parseFloat(currentCost) || 0;
        const rate = inflationRate / 100;

        const yearsRemaining = Math.max(colAge - cAge, 0);

        // Determine the future cost
        let futureCost;
        const selectedCourseObj = courseData.find(c => c.name === selectedCourse);

        if (selectedCourseObj) {
            // Use pre-computed courseData projections (interpolated) for selected courses
            futureCost = getFutureCostFromCourseData(selectedCourseObj, yearsRemaining);
        } else {
            // For custom input, use the inflation rate calculation
            futureCost = cost * Math.pow(1 + rate, yearsRemaining);
        }

        // Year-by-year breakdown for chart
        const yearlyData = [];
        for (let i = 0; i <= yearsRemaining; i++) {
            if (selectedCourseObj) {
                yearlyData.push({
                    year: i,
                    cost: getFutureCostFromCourseData(selectedCourseObj, i),
                });
            } else {
                yearlyData.push({
                    year: i,
                    cost: cost * Math.pow(1 + rate, i),
                });
            }
        }

        setResults({
            yearsRemaining,
            futureCost,
            currentCost: cost,
            yearlyData,
            inflationRate: inflationRate,
            costIncrease: futureCost - cost,
            multiplier: (futureCost / cost).toFixed(1),
            courseName: selectedCourse || 'Custom',
            courseRef: selectedCourseObj || null,
        });
    };

    const handleReset = () => {
        setChildAge('');
        setCollegeAge('');
        setCurrentCost('');
        setSelectedCourse('');
        setInflationRate(7);
        setResults(null);
    };

    const chartData = results ? {
        labels: ['Current Cost', 'Future Cost'],
        datasets: [{
            label: 'Education Cost',
            data: [results.currentCost, results.futureCost],
            backgroundColor: [
                'rgba(240, 123, 32, 0.7)',
                'rgba(232, 93, 0, 0.9)',
            ],
            borderColor: [
                'rgba(240, 123, 32, 1)',
                'rgba(232, 93, 0, 1)',
            ],
            borderWidth: 2,
            borderRadius: 12,
            barPercentage: 0.5,
        }]
    } : null;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => formatCurrency(ctx.raw)
                },
                backgroundColor: '#1A1A2E',
                titleFont: { family: 'Outfit', size: 14 },
                bodyFont: { family: 'Inter', size: 13 },
                padding: 12,
                cornerRadius: 10,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (val) => formatCurrency(val),
                    font: { family: 'Inter', size: 11 },
                    color: '#909090',
                },
                grid: { color: 'rgba(0,0,0,0.05)' },
            },
            x: {
                ticks: {
                    font: { family: 'Outfit', size: 13, weight: 600 },
                    color: '#444',
                },
                grid: { display: false },
            }
        }
    };

    return (
        <div className="calculator-page">
            <div className="page-header">
                <div className="container">
                    <h1 data-aos="fade-up">Child Education Cost Calculator</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        See how inflation increases education costs over time and plan ahead for your child's future.
                    </p>
                </div>
            </div>

            <section className="calculator-section">
                <div className="container">
                    <div className="calculator-grid">
                        <div className="calculator-form-card" data-aos="fade-right">
                            <h3>🎓 Education Inflation Calculator</h3>
                            <p>Enter your child's details and current education cost estimate.</p>
                            <form onSubmit={handleCalculate}>
                                <div className="form-group">
                                    <label className="form-label">Child's Current Age</label>
                                    <div className="input-with-prefix">
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 5"
                                            value={childAge}
                                            onChange={(e) => setChildAge(e.target.value)}
                                            required
                                            min="0"
                                            max="25"
                                        />
                                        <span className="input-suffix">years</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Expected College Age</label>
                                    <div className="input-with-prefix">
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 18"
                                            value={collegeAge}
                                            onChange={(e) => setCollegeAge(e.target.value)}
                                            required
                                            min="1"
                                            max="30"
                                        />
                                        <span className="input-suffix">years</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Select Course (Avg. Cost)</label>
                                    <select
                                        className="form-input"
                                        value={selectedCourse}
                                        onChange={handleCourseChange}
                                        style={{ appearance: 'auto' }}
                                    >
                                        <option value="">-- Select a Course --</option>
                                        {courseData.map((course, index) => (
                                            <option key={index} value={course.name}>
                                                {course.name} ({formatCurrency(course.currentCost)})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Current Education Cost {selectedCourse && '(Auto-filled)'}</label>
                                    <div className="input-with-prefix">
                                        <span className="input-prefix">₹</span>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="e.g., 1000000"
                                            value={currentCost}
                                            onChange={(e) => setCurrentCost(e.target.value)}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Expected Inflation Rate: {inflationRate}%</label>
                                    <div className="range-input-group">
                                        <input
                                            type="range"
                                            min="5"
                                            max="15"
                                            step="0.5"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                        />
                                        <div className="range-labels">
                                            <span>5%</span>
                                            <span>10%</span>
                                            <span>15%</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                        <FiBookOpen /> Calculate Future Cost
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
                                        <div className="result-item-icon"><FiCalendar /></div>
                                        <div>
                                            <div className="result-item-label">Years Remaining</div>
                                            <div className="result-item-value">{results.yearsRemaining} Years</div>
                                            <div className="result-item-sublabel">Until college education begins</div>
                                        </div>
                                    </div>

                                    <div className="result-card-item primary" data-aos="fade-up" data-aos-delay="100">
                                        <div className="result-item-icon"><FiTrendingUp /></div>
                                        <div>
                                            <div className="result-item-label">Estimated Future Education Cost</div>
                                            <div className="result-item-value">{formatCurrency(results.futureCost)}</div>
                                            <div className="result-item-sublabel">
                                                At {results.inflationRate}% annual inflation — {results.multiplier}x increase
                                            </div>
                                        </div>
                                    </div>

                                    <div className="result-card-item" data-aos="fade-up" data-aos-delay="200">
                                        <div className="result-item-icon"><FiBookOpen /></div>
                                        <div>
                                            <div className="result-item-label">Inflation Impact</div>
                                            <div className="result-item-value">{formatCurrency(results.costIncrease)}</div>
                                            <div className="result-item-sublabel">Additional cost due to inflation</div>
                                        </div>
                                    </div>

                                    {results.courseRef && (
                                        <div className="result-card-item course-projection" data-aos="fade-up" data-aos-delay="250" style={{ background: '#fff3e0', border: '1px solid #ffcc80', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', marginBottom: '8px' }}>
                                                <div className="result-item-icon" style={{ background: '#ffe0b2', color: '#e65100', width: '40px', height: '40px', minWidth: '40px', fontSize: '1.2rem' }}>🎓</div>
                                                <div>
                                                    <div className="result-item-label" style={{ color: '#ef6c00' }}>Selected Course</div>
                                                    <div className="result-item-value" style={{ fontSize: '1.2rem' }}>{results.courseRef.name}</div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
                                                <div>
                                                    <div className="result-item-sublabel">5 Years Later</div>
                                                    <div style={{ fontWeight: '700', color: '#333' }}>{formatCurrency(results.courseRef.fiveYear)}</div>
                                                </div>
                                                <div>
                                                    <div className="result-item-sublabel">10 Years Later</div>
                                                    <div style={{ fontWeight: '700', color: '#333' }}>{formatCurrency(results.courseRef.tenYear)}</div>
                                                </div>
                                                <div>
                                                    <div className="result-item-sublabel">15 Years Later</div>
                                                    <div style={{ fontWeight: '700', color: '#333' }}>{formatCurrency(results.courseRef.fifteenYear)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="chart-container" data-aos="fade-up" data-aos-delay="300">
                                        <h3>📊 Current vs Future Cost</h3>
                                        <div style={{ height: '300px' }}>
                                            <Bar ref={chartRef} data={chartData} options={chartOptions} />
                                        </div>
                                    </div>

                                    <div className="result-explanation" data-aos="fade-up" data-aos-delay="400">
                                        <h4><FiInfo style={{ verticalAlign: 'middle' }} /> What This Means</h4>
                                        <p>
                                            Due to rising education costs and inflation, a course that costs {formatCurrency(results.currentCost)} today
                                            may cost more than {formatCurrency(results.futureCost)} in {results.yearsRemaining} years.
                                            Early financial planning helps reduce this burden. Consider starting a Systematic Investment Plan (SIP),
                                            education-focused mutual funds, or a dedicated education savings plan.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎓</div>
                                    <h3 style={{ marginBottom: '8px' }}>Plan Your Child's Education</h3>
                                    <p>Fill in the details and see how inflation will impact future education costs.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== EDUCATION COST DATA SECTION ========== */}
            <section className="education-cost-data">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">Real Data</span>
                        <h2 className="section-title">Education Cost <span>Inflation Breakdown</span></h2>
                        <p className="section-subtitle">
                            Understand the average inflation rates and course-wise costs across popular colleges in India
                        </p>
                    </div>

                    <div className="education-tables-grid" data-aos="fade-up" data-aos-delay="200">
                        {/* Inflation Rates + Top Colleges */}
                        <div className="education-tables-sidebar">
                            <div className="education-table-card">
                                <h4 className="education-table-title">📊 Average Inflation Rates</h4>
                                <table className="education-styled-table compact-table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Rate (p.a.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Education</td><td className="highlight-cell">14.7%</td></tr>
                                        <tr><td>Medical</td><td className="highlight-cell">14.1%</td></tr>
                                        <tr><td>Food</td><td>11.8%</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="education-table-card">
                                <h4 className="education-table-title">🏛️ Top College Costs (Current)</h4>
                                <table className="education-styled-table compact-table">
                                    <thead>
                                        <tr>
                                            <th>College</th>
                                            <th>Place</th>
                                            <th>Fees</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {collegeData.map((college, index) => (
                                            <tr key={index}>
                                                <td className="college-name-cell">{college.name}</td>
                                                <td>{college.place}</td>
                                                <td className="amount-cell">{formatCurrency(college.amount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="education-table-card key-takeaway-card">
                                <h4 className="education-table-title">💡 Key Takeaway</h4>
                                <p>
                                    Education inflation (14.7%) is <strong>significantly higher</strong> than general inflation.
                                    Starting early with SIPs and dedicated education funds can help you stay ahead of rising costs.
                                </p>
                            </div>
                        </div>

                        {/* Course Cost Projections Table */}
                        <div className="education-table-card course-table-card">
                            <h4 className="education-table-title">🎓 Course-wise Future Cost Projections</h4>
                            <p className="table-subtitle">How today's education costs will grow over time due to inflation</p>
                            <div className="table-scroll-wrapper">
                                <table className="education-styled-table course-projection-table">
                                    <thead>
                                        <tr>
                                            <th>Course</th>
                                            <th>Today (₹)</th>
                                            <th>5 Years Later</th>
                                            <th>10 Years Later</th>
                                            <th>15 Years Later</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseData.map((course, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'row-even' : ''}>
                                                <td className="course-name-cell" data-label="Course">{course.name}</td>
                                                <td data-label="Today (₹)">{formatCurrency(course.currentCost)}</td>
                                                <td data-label="5 Years Later">{formatCurrency(course.fiveYear)}</td>
                                                <td data-label="10 Years Later">{formatCurrency(course.tenYear)}</td>
                                                <td className="future-cost-cell" data-label="15 Years Later">{formatCurrency(course.fifteenYear)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">Plan Ahead</span>
                        <h2 className="section-title">Steps for <span>Education Planning</span></h2>
                    </div>
                    <div className="info-cards">
                        <div className="info-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="info-card-number">1</div>
                            <h4>Estimate the Cost</h4>
                            <p>Research current costs and use our calculator to project future expenses with inflation.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="info-card-number">2</div>
                            <h4>Start Investing Early</h4>
                            <p>The power of compounding works best over long periods. Even small monthly SIPs can accumulate significantly.</p>
                        </div>
                        <div className="info-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="info-card-number">3</div>
                            <h4>Review Regularly</h4>
                            <p>Education costs change. Review your plan annually and adjust your savings strategy accordingly.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EducationCalculatorPage;
