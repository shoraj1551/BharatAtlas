import { Link } from 'react-router-dom'
import './GovernancePage.css'
import GOVERNANCE_CHARTER from '../utils/governanceCharter'
import { ROLES } from '../utils/governanceRoles'

function GovernancePage() {
    return (
        <div className="governance-page">
            <div className="governance-content">
                <header className="governance-header">
                    <h1>How BharatAtlas Works</h1>
                    <p className="subtitle">Governance, transparency, and accountability</p>
                </header>

                {/* Story 190: Governance Charter */}
                <section className="charter-section">
                    <h2>Our Charter</h2>
                    <div className="principles">
                        <h3>Core Principles</h3>
                        <ul>
                            {GOVERNANCE_CHARTER.corePrinciples.map((principle, i) => (
                                <li key={i}><strong>{principle}</strong></li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Story 171: Explicit Roles */}
                <section className="roles-section">
                    <h2>Roles & Responsibilities</h2>
                    {Object.entries(GOVERNANCE_CHARTER.roles).map(([role, data]) => (
                        <div key={role} className="role-card">
                            <h3>{role.charAt(0).toUpperCase() + role.slice(1)}</h3>
                            <p>{data.description}</p>
                            <h4>Responsibilities:</h4>
                            <ul>
                                {data.responsibilities.map((resp, i) => (
                                    <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* Story 174-177: Contribution Process */}
                <section className="contribution-section">
                    <h2>How Data Changes Work</h2>
                    <div className="process-flow">
                        <div className="process-step">
                            <h3>1. Proposal</h3>
                            <p>Contributors propose changes with mandatory evidence</p>
                        </div>
                        <div className="process-step">
                            <h3>2. Review</h3>
                            <p>Curators review evidence and credibility</p>
                        </div>
                        <div className="process-step">
                            <h3>3. Approval</h3>
                            <p>Standard data: 1 approval. Sensitive data: 2+ approvals</p>
                        </div>
                        <div className="process-step">
                            <h3>4. Publication</h3>
                            <p>Approved changes become public with full audit trail</p>
                        </div>
                    </div>
                </section>

                {/* Story 178-180: Dispute Process */}
                <section className="dispute-section">
                    <h2>Dispute Resolution</h2>
                    <p>Disagreements are visible and formalized, not hidden.</p>
                    <div className="dispute-lifecycle">
                        <div className="lifecycle-state">
                            <strong>Raised</strong>
                            <p>Anyone can initiate a dispute</p>
                        </div>
                        <div className="lifecycle-state">
                            <strong>Under Review</strong>
                            <p>Curators examine evidence</p>
                        </div>
                        <div className="lifecycle-state">
                            <strong>Resolved</strong>
                            <p>Decision made, minority views preserved</p>
                        </div>
                        <div className="lifecycle-state">
                            <strong>Archived</strong>
                            <p>Historical record maintained</p>
                        </div>
                    </div>
                </section>

                {/* Story 181: Immutable History */}
                <section className="transparency-section">
                    <h2>Transparency Guarantees</h2>
                    <div className="guarantees">
                        <div className="guarantee">
                            <h3>📜 Immutable History</h3>
                            <p>Edit history cannot be rewritten or deleted</p>
                        </div>
                        <div className="guarantee">
                            <h3>🔍 Public Logs</h3>
                            <p>All governance actions are logged and inspectable</p>
                        </div>
                        <div className="guarantee">
                            <h3>⚠️ Visible Disputes</h3>
                            <p>Data under dispute is clearly marked</p>
                        </div>
                        <div className="guarantee">
                            <h3>🗣️ Minority Opinions</h3>
                            <p>Dissenting views are preserved, not erased</p>
                        </div>
                    </div>
                </section>

                {/* Story 184: Curator Disclosure */}
                <section className="curator-section">
                    <h2>Curator Accountability</h2>
                    <p>All curators must disclose affiliations and potential conflicts of interest.</p>
                    <Link to="/curators" className="view-curators-link">
                        View Curator Profiles →
                    </Link>
                </section>

                {/* Story 187: Public Logs */}
                <section className="logs-section">
                    <h2>Governance Logs</h2>
                    <p>All decisions are publicly logged and auditable.</p>
                    <Link to="/governance/logs" className="view-logs-link">
                        View Governance Logs →
                    </Link>
                </section>

                <footer className="governance-footer">
                    <p>
                        <strong>Questions about governance?</strong> Contact us or review our{' '}
                        <Link to="/governance/charter">full charter</Link>.
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default GovernancePage
