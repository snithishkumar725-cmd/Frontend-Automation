import React, { useMemo } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  ArcElement, LineElement, PointElement, Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  RiTeamLine, RiCheckboxCircleLine, RiBuildingLine, RiMoneyDollarCircleLine,
  RiArrowUpLine, RiArrowDownLine, RiUserLine
} from 'react-icons/ri';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import './DashboardPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#f1f5f9', bodyColor: '#94a3b8', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 },
  },
  scales: {
    x: { grid: { color: 'rgba(148,163,184,0.1)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
    y: { grid: { color: 'rgba(148,163,184,0.1)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 16, font: { size: 12 } } },
    tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#f1f5f9', bodyColor: '#94a3b8' },
  },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEPT_COLORS = ['#2563EB', '#06B6D4', '#22C55E', '#f59e0b', '#8b5cf6', '#EF4444', '#ec4899', '#14b8a6', '#f97316', '#64748b'];

const DashboardPage = () => {
  const { employees } = useApp();

  const stats = useMemo(() => {
    const active = employees.filter((e) => e.status === 'Active').length;
    const depts = [...new Set(employees.map((e) => e.department))];
    const totalPayroll = employees.reduce((s, e) => s + Number(e.salary), 0);
    return { total: employees.length, active, depts: depts.length, payroll: totalPayroll };
  }, [employees]);

  // Dept distribution
  const deptData = useMemo(() => {
    const map = {};
    employees.forEach((e) => { map[e.department] = (map[e.department] || 0) + 1; });
    const labels = Object.keys(map);
    const data = labels.map((d) => map[d]);
    return {
      labels,
      datasets: [{
        data,
        backgroundColor: DEPT_COLORS.slice(0, labels.length),
        borderWidth: 0,
        hoverOffset: 6,
      }],
    };
  }, [employees]);

  // Salary distribution by dept
  const salaryData = useMemo(() => {
    const map = {};
    employees.forEach((e) => {
      if (!map[e.department]) map[e.department] = { total: 0, count: 0 };
      map[e.department].total += Number(e.salary);
      map[e.department].count += 1;
    });
    const labels = Object.keys(map);
    const avgs = labels.map((d) => Math.round(map[d].total / map[d].count));
    return {
      labels,
      datasets: [{
        label: 'Avg Salary (₹)',
        data: avgs,
        backgroundColor: DEPT_COLORS.slice(0, labels.length).map((c) => c + 'CC'),
        borderColor: DEPT_COLORS.slice(0, labels.length),
        borderWidth: 2,
        borderRadius: 8,
      }],
    };
  }, [employees]);

  // Trend line (mock monthly data)
  const lineData = useMemo(() => {
    const months = MONTHS.slice(0, new Date().getMonth() + 1);
    const base = stats.payroll / (months.length || 1);
    const data = months.map((_, i) => Math.round(base * (0.85 + i * 0.02 + Math.random() * 0.05)));
    return {
      labels: months,
      datasets: [{
        label: 'Monthly Payroll (₹)',
        data,
        fill: true,
        backgroundColor: 'rgba(37,99,235,0.1)',
        borderColor: '#2563EB',
        borderWidth: 2.5,
        pointBackgroundColor: '#2563EB',
        pointRadius: 4,
        tension: 0.4,
      }],
    };
  }, [stats.payroll]);

  // Gender breakdown
  const genderData = useMemo(() => {
    const male = employees.filter((e) => e.gender === 'Male').length;
    const female = employees.filter((e) => e.gender === 'Female').length;
    const other = employees.length - male - female;
    return {
      labels: ['Male', 'Female', 'Other'],
      datasets: [{
        data: [male, female, other].filter((v) => v > 0),
        backgroundColor: ['#2563EB', '#ec4899', '#22C55E'],
        borderWidth: 0,
        hoverOffset: 6,
      }],
    };
  }, [employees]);

  const statCards = [
    {
      label: 'Total Employees',
      value: stats.total,
      icon: <RiTeamLine />,
      color: 'var(--gradient-primary)',
      trend: '+5%',
      up: true,
      sub: 'vs last month',
    },
    {
      label: 'Active Employees',
      value: stats.active,
      icon: <RiCheckboxCircleLine />,
      color: 'var(--gradient-success)',
      trend: '+2%',
      up: true,
      sub: 'currently working',
    },
    {
      label: 'Departments',
      value: stats.depts,
      icon: <RiBuildingLine />,
      color: 'var(--gradient-accent)',
      trend: '0%',
      up: null,
      sub: 'active departments',
    },
    {
      label: 'Monthly Payroll',
      value: `₹${(stats.payroll / 100000).toFixed(1)}L`,
      icon: <RiMoneyDollarCircleLine />,
      color: 'var(--gradient-secondary)',
      trend: '+3%',
      up: true,
      sub: 'total expenditure',
      isString: true,
    },
  ];

  const recentActivity = [
    ...employees.slice(0, 5).map((e) => ({
      icon: <RiUserLine />,
      text: `${e.name} joined ${e.department}`,
      time: new Date(e.dateOfJoining).toLocaleDateString('en-IN'),
      color: '#2563EB',
    })),
  ];

  return (
    <div className="page-wrapper dashboard-page">
      <Navbar />
      <div className="container dashboard-container">
        {/* Header */}
        <div className="dashboard-header fade-in-down">
          <div>
            <h1 className="section-title">Analytics <span className="gradient-text">Dashboard</span></h1>
            <p className="section-subtitle">Real-time workforce insights and metrics</p>
          </div>
          <div className="dash-date">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="dash-stats-grid">
          {statCards.map((card, i) => (
            <div key={i} className="dash-stat-card card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="dash-stat-top">
                <div className="dash-stat-icon" style={{ background: card.color }}>{card.icon}</div>
                {card.up !== null && (
                  <div className={`dash-trend ${card.up ? 'trend-up' : 'trend-down'}`}>
                    {card.up ? <RiArrowUpLine /> : <RiArrowDownLine />}
                    {card.trend}
                  </div>
                )}
              </div>
              <div className="dash-stat-value">{card.isString ? card.value : card.value.toLocaleString()}</div>
              <div className="dash-stat-label">{card.label}</div>
              <div className="dash-stat-sub">{card.sub}</div>
              <div className="dash-stat-bar">
                <div className="dash-stat-bar-fill" style={{ background: card.color, width: `${Math.min((card.isString ? stats.active : card.value) / Math.max(stats.total, 1) * 100, 100)}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="charts-grid">
          {/* Bar chart */}
          <div className="chart-card card fade-in-up">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Average Salary by Department</h3>
                <p className="chart-sub">Monthly average compensation per department</p>
              </div>
            </div>
            <div className="chart-body">
              <Bar data={salaryData} options={chartOptions} />
            </div>
          </div>

          {/* Doughnut */}
          <div className="chart-card chart-card-sm card fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Department Distribution</h3>
                <p className="chart-sub">Employees per department</p>
              </div>
            </div>
            <div className="chart-body">
              <Doughnut data={deptData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="charts-grid">
          {/* Line chart */}
          <div className="chart-card card fade-in-up">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Payroll Trend</h3>
                <p className="chart-sub">Monthly payroll expenditure this year</p>
              </div>
            </div>
            <div className="chart-body">
              <Line data={lineData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
            </div>
          </div>

          {/* Gender Doughnut */}
          <div className="chart-card chart-card-sm card fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Gender Diversity</h3>
                <p className="chart-sub">Workforce gender breakdown</p>
              </div>
            </div>
            <div className="chart-body">
              <Doughnut data={genderData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Bottom Row: Recent Activity + Top Earners */}
        <div className="dash-bottom-grid">
          {/* Recent activity */}
          <div className="card activity-card fade-in-up">
            <div className="chart-header">
              <h3 className="chart-title">Recent Activity</h3>
            </div>
            <div className="activity-list">
              {recentActivity.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon" style={{ background: a.color + '20', color: a.color }}>
                    {a.icon}
                  </div>
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top earners */}
          <div className="card top-earners-card fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="chart-header">
              <h3 className="chart-title">Top Earners</h3>
            </div>
            <div className="earners-list">
              {[...employees].sort((a, b) => Number(b.salary) - Number(a.salary)).slice(0, 5).map((emp, i) => (
                <div key={emp.id} className="earner-item">
                  <div className="earner-rank">#{i + 1}</div>
                  <div className="earner-avatar" style={{ background: `hsl(${emp.name.charCodeAt(0) * 5}, 60%, 55%)` }}>
                    {emp.name.charAt(0)}
                  </div>
                  <div className="earner-info">
                    <div className="earner-name">{emp.name}</div>
                    <div className="earner-dept">{emp.department}</div>
                  </div>
                  <div className="earner-salary">₹{Number(emp.salary).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
