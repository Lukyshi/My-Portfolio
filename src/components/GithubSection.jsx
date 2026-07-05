import { Github, GitBranch, Star } from 'lucide-react';

const REPOS = [
  {
    name: 'HospitalManagementAPI',
    description: 'Java/Spring Boot REST API with JWT auth and layered architecture.',
    language: 'Java',
    color: '#b07219',
    stars: 3,
    forks: 1,
    url: 'https://github.com/Lukyshi/HospitalManagementAPI'
  },
  {
    name: 'TaskManagementAPI',
    description: 'Node.js/Express/Prisma/MySQL API with task CRUD and activity logging.',
    language: 'JavaScript',
    color: '#f1e05a',
    stars: 4,
    forks: 2,
    url: 'https://github.com/Lukyshi/TaskManagementAPI'
  },
  {
    name: 'Real-Time-Collaboration-Platform-API',
    description: 'Node.js/TypeScript API using Prisma, currently under active development.',
    language: 'TypeScript',
    color: '#3178c6',
    stars: 2,
    forks: 0,
    url: 'https://github.com/Lukyshi/Real-Time-Collaboration-Platform-API'
  }
];

export default function GithubSection() {
  return (
    <section id="github" className="glass-panel">
      <h2 className="section-title">
        <Github size={28} className="logo-dot" /> GitHub Profile
      </h2>
      <p className="section-subtitle">&gt; curl https://api.github.com/users/Lukyshi</p>
      
      <div className="github-wrapper">
        {/* Profile Card Mockup */}
        <div className="glass-panel github-profile-card">
          <svg
            className="github-avatar"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" fill="#1f2937" rx="50" />
            <circle cx="50" cy="45" r="20" fill="#cbd5e1" />
            <path d="M50 70C65 70 78 78 78 80H22C22 78 35 70 50 70Z" fill="#cbd5e1" />
          </svg>
          
          <div className="github-profile-info">
            <h3 className="github-username">Luiz Bangsoy (@Lukyshi)</h3>
            <p className="github-bio">Backend Developer | Java & Node.js Engineer</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Focusing on robust relational databases, JWT/RBAC security architectures, and scalable RESTful APIs.
            </p>
          </div>

          <a
            href="https://github.com/Lukyshi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Github size={16} />
            Follow on GitHub
          </a>
        </div>

        {/* Highlight Repositories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {REPOS.map((repo) => (
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.name}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px',
                textAlign: 'left',
                border: '1px solid var(--border-color)',
                transition: 'var(--transition)'
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: 8 }}>
                  {repo.name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                  {repo.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: repo.color }} />
                  <span>{repo.language}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Star size={12} /> {repo.stars}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <GitBranch size={12} /> {repo.forks}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="glass-panel github-contributions">
          <div className="contributions-header">
            <span className="contributions-title">Live GitHub activity</span>
            <span style={{ color: 'var(--text-muted)' }}>Contribution Activity</span>
          </div>

          <img
            className="real-github-graph-img"
            src="https://ghchart.rshah.org/ffffff/Lukyshi"
            alt="Live GitHub contributions for Lukyshi"
            loading="lazy"
          />
          <a className="db-diagram-link" href="https://github.com/Lukyshi" target="_blank" rel="noreferrer">
            Open the live GitHub profile →
          </a>
        </div>
      </div>
    </section>
  );
}
