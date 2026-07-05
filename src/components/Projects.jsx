import { Folder, ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Hospital Management API',
    description: 'Java/Spring Boot REST API with JWT auth, role-based access control (RBAC), and layered architecture for managing patients, doctors, and appointments.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'JPA', 'MySQL', 'Swagger'],
    github: 'https://github.com/Lukyshi/HospitalManagementAPI',
    status: 'completed',
    fileName: 'HospitalAPI.java'
  },
  {
    title: 'Task Management API',
    description: 'Node.js/Express/Prisma/MySQL API with JWT auth, task CRUD, pagination, and activity logging, built on a robust layered architecture.',
    tech: ['Node.js', 'Express', 'Prisma', 'MySQL', 'JWT', 'REST API'],
    github: 'https://github.com/Lukyshi/TaskManagementAPI',
    status: 'completed',
    fileName: 'taskController.js'
  },
  {
    title: 'Real-Time Collaboration Platform API',
    description: 'High-concurrency Node.js/TypeScript API utilizing Prisma, currently under active development to support WebSocket gateways and caching layer integrations.',
    tech: ['Node.js', 'TypeScript', 'Prisma', 'WebSockets', 'Redis'],
    github: 'https://github.com/Lukyshi/Real-Time-Collaboration-Platform-API',
    status: 'in-progress',
    fileName: 'socketServer.ts'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="glass-panel">
      <h2 className="section-title">
        <Folder size={28} className="logo-dot" /> Featured Projects
      </h2>
      <p className="section-subtitle">&gt; git log --oneline -n 3</p>
      
      <div className="projects-grid">
        {PROJECTS.map((project, index) => (
          <div key={index} className="glass-panel project-card">
            {/* Editor-like Tab Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-primary)',
              margin: '-24px -24px 20px -24px',
              padding: '10px 16px',
              borderTopLeftRadius: 'var(--radius-md)',
              borderTopRightRadius: 'var(--radius-md)',
              borderBottom: '1px solid var(--border-color)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: project.status === 'in-progress' ? '#f59e0b' : 'var(--accent-green)'
                }} />
                <span>{project.fileName}</span>
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)' }}
              >
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="project-body">
              <div className="project-meta">
                <h3 className="project-title">{project.title}</h3>
                {project.status === 'in-progress' && (
                  <span className="badge badge-progress">In Progress</span>
                )}
                {project.status === 'completed' && (
                  <span className="badge badge-success">Completed</span>
                )}
              </div>
              
              <p className="project-desc">{project.description}</p>
              
              <div className="project-tags">
                {project.tech.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Github size={16} />
                  View Repository
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
