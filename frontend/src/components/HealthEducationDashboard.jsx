import './HealthEducationDashboard.css'

export default function HealthEducationDashboard({ healthEducation }) {
    if (!healthEducation) return null

    const {
        hospitals_per_100k,
        doctors_per_100k,
        hospital_beds_per_100k,
        schools_per_100k,
        teachers_per_100k,
        student_teacher_ratio,
        health_index,
        education_index
    } = healthEducation

    return (
        <div className="health-education-dashboard">
            <h3>🏥 Health & Education</h3>

            <div className="index-cards">
                <div className="index-card health">
                    <div className="index-header">
                        <span className="index-icon">🏥</span>
                        <span className="index-title">Health Index</span>
                    </div>
                    <div className="index-score">{health_index}</div>
                    <div className="index-bar">
                        <div
                            className="index-fill health-fill"
                            style={{ width: `${health_index}%` }}
                        />
                    </div>
                </div>

                <div className="index-card education">
                    <div className="index-header">
                        <span className="index-icon">🎓</span>
                        <span className="index-title">Education Index</span>
                    </div>
                    <div className="index-score">{education_index}</div>
                    <div className="index-bar">
                        <div
                            className="index-fill education-fill"
                            style={{ width: `${education_index}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="metrics-grid">
                <div className="metric-section">
                    <h4>Health Metrics</h4>
                    <div className="metric-list">
                        <div className="metric-item">
                            <span className="metric-name">Hospitals per 100K</span>
                            <span className="metric-val">{hospitals_per_100k}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-name">Doctors per 100K</span>
                            <span className="metric-val">{doctors_per_100k}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-name">Hospital Beds per 100K</span>
                            <span className="metric-val">{hospital_beds_per_100k}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-section">
                    <h4>Education Metrics</h4>
                    <div className="metric-list">
                        <div className="metric-item">
                            <span className="metric-name">Schools per 100K</span>
                            <span className="metric-val">{schools_per_100k}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-name">Teachers per 100K</span>
                            <span className="metric-val">{teachers_per_100k}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-name">Student-Teacher Ratio</span>
                            <span className="metric-val">{student_teacher_ratio}:1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
