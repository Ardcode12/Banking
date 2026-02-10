import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { FiTrendingUp, FiBarChart2, FiPieChart } from 'react-icons/fi';
import './VisualizationPage.css';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const formatCurrency = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
};

const commonTooltip = {
    backgroundColor: '#1A1A2E',
    titleFont: { family: 'Outfit', size: 13 },
    bodyFont: { family: 'Inter', size: 12 },
    padding: 12,
    cornerRadius: 10,
};

const VisualizationPage = () => {
    // Inflation growth data (₹10L over 20 years at 7%)
    const years = Array.from({ length: 21 }, (_, i) => `Year ${i}`);
    const inflationData = years.map((_, i) => 1000000 * Math.pow(1.07, i));

    const inflationChartData = {
        labels: years,
        datasets: [{
            label: 'Cost at 7% Inflation',
            data: inflationData,
            borderColor: '#E85D00',
            backgroundColor: 'rgba(232, 93, 0, 0.08)',
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#E85D00',
            tension: 0.4,
            fill: true,
        }]
    };

    const inflationOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                ...commonTooltip,
                callbacks: { label: (ctx) => formatCurrency(ctx.raw) }
            }
        },
        scales: {
            y: {
                ticks: { callback: (v) => formatCurrency(v), font: { size: 10 }, color: '#909090' },
                grid: { color: 'rgba(0,0,0,0.04)' }
            },
            x: {
                ticks: { font: { size: 10 }, color: '#909090', maxTicksLimit: 11 },
                grid: { display: false }
            }
        }
    };

    // Current vs Future Cost comparison
    const comparisonData = {
        labels: ['Engineering', 'Medical (MBBS)', 'MBA', 'Study Abroad'],
        datasets: [
            {
                label: 'Current Cost (2024)',
                data: [1000000, 2500000, 2000000, 3500000],
                backgroundColor: 'rgba(240, 123, 32, 0.6)',
                borderColor: 'rgba(240, 123, 32, 1)',
                borderWidth: 2,
                borderRadius: 8,
            },
            {
                label: 'Projected Cost (2037)',
                data: [2410000, 6025000, 4820000, 8435000],
                backgroundColor: 'rgba(232, 93, 0, 0.9)',
                borderColor: 'rgba(232, 93, 0, 1)',
                borderWidth: 2,
                borderRadius: 8,
            }
        ]
    };

    const comparisonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { font: { family: 'Outfit', size: 12 }, usePointStyle: true, padding: 20 }
            },
            tooltip: {
                ...commonTooltip,
                callbacks: { label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw)}` }
            }
        },
        scales: {
            y: {
                ticks: { callback: (v) => formatCurrency(v), font: { size: 10 }, color: '#909090' },
                grid: { color: 'rgba(0,0,0,0.04)' }
            },
            x: {
                ticks: { font: { family: 'Outfit', size: 11, weight: 600 }, color: '#444' },
                grid: { display: false }
            }
        }
    };

    // Insurance coverage gap
    const coverageData = {
        labels: ['Existing Coverage', 'Coverage Gap'],
        datasets: [{
            data: [5000000, 15000000],
            backgroundColor: ['rgba(240, 123, 32, 0.7)', 'rgba(232, 93, 0, 0.95)'],
            borderColor: ['rgba(240, 123, 32, 1)', 'rgba(232, 93, 0, 1)'],
            borderWidth: 3,
            hoverOffset: 10,
        }]
    };

    const coverageOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: { font: { family: 'Outfit', size: 12 }, usePointStyle: true, padding: 20 }
            },
            tooltip: {
                ...commonTooltip,
                callbacks: { label: (ctx) => `${ctx.label}: ${formatCurrency(ctx.raw)}` }
            }
        }
    };

    return (
        <div className="visualization-page">
            <div className="page-header">
                <div className="container">
                    <h1 data-aos="fade-up">Visualizations & Insights</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Interactive charts to help you understand inflation, education costs, and insurance gaps at a glance.
                    </p>
                </div>
            </div>

            <section className="viz-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-badge">Visual Data</span>
                        <h2 className="section-title">Understanding the <span>Numbers</span></h2>
                        <p className="section-subtitle">
                            These visualizations use sample data to illustrate key financial concepts.
                            Use our calculators for personalized results.
                        </p>
                    </div>

                    <div className="viz-charts-grid">
                        {/* Inflation Growth Chart */}
                        <div className="viz-chart-card full-width" data-aos="fade-up">
                            <div className="viz-chart-header">
                                <div className="viz-chart-icon"><FiTrendingUp /></div>
                                <div>
                                    <h3>Inflation Growth Over 20 Years</h3>
                                    <p>How ₹10 Lakhs grows at 7% annual inflation</p>
                                </div>
                            </div>
                            <div className="viz-chart-body">
                                <Line data={inflationChartData} options={inflationOptions} />
                            </div>
                        </div>

                        {/* Current vs Future Cost */}
                        <div className="viz-chart-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="viz-chart-header">
                                <div className="viz-chart-icon"><FiBarChart2 /></div>
                                <div>
                                    <h3>Current vs Future Education Cost</h3>
                                    <p>Projected costs in 13 years at 7% inflation</p>
                                </div>
                            </div>
                            <div className="viz-chart-body">
                                <Bar data={comparisonData} options={comparisonOptions} />
                            </div>
                        </div>

                        {/* Coverage Gap */}
                        <div className="viz-chart-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="viz-chart-header">
                                <div className="viz-chart-icon"><FiPieChart /></div>
                                <div>
                                    <h3>Insurance Coverage Gap</h3>
                                    <p>Sample: ₹50L coverage vs ₹2Cr HLV</p>
                                </div>
                            </div>
                            <div className="viz-chart-body">
                                <Doughnut data={coverageData} options={coverageOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Tips Grid */}
                    <div className="section-header" data-aos="fade-up" style={{ marginTop: '40px' }}>
                        <span className="section-badge">Quick Tips</span>
                        <h2 className="section-title">Financial <span>Insights</span></h2>
                    </div>

                    <div className="tips-grid">
                        <div className="tip-card" data-aos="fade-up" data-aos-delay="100">
                            <span className="tip-emoji">📈</span>
                            <h4>Start SIPs Early</h4>
                            <p>Even ₹5,000/month invested at 12% returns can grow to ₹50+ lakhs in 20 years through compounding.</p>
                        </div>
                        <div className="tip-card" data-aos="fade-up" data-aos-delay="200">
                            <span className="tip-emoji">🛡️</span>
                            <h4>10x Income Rule</h4>
                            <p>A good rule of thumb: your life insurance should be at least 10-15 times your annual income.</p>
                        </div>
                        <div className="tip-card" data-aos="fade-up" data-aos-delay="300">
                            <span className="tip-emoji">🏥</span>
                            <h4>Health Cover = ₹10L+</h4>
                            <p>With rising hospital costs, experts recommend a minimum health cover of ₹10 lakhs for a family.</p>
                        </div>
                        <div className="tip-card" data-aos="fade-up" data-aos-delay="400">
                            <span className="tip-emoji">🎯</span>
                            <h4>Review Annually</h4>
                            <p>Life changes — marriages, children, salary hikes — should trigger a review of your insurance portfolio.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisualizationPage;
