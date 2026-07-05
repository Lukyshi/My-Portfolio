import { Cpu } from 'lucide-react';

// Official Cursor IDE logo as inline SVG data URI
const CURSOR_LOGO = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" fill="none"><rect width="110" height="110" rx="24" fill="#000"/><path d="M27 82V28l56 27-22 9.5L75 82l-12 5-14-17.5L27 82Z" fill="#fff"/><path d="M61 64.5L75 82l-12 5-14-17.5" fill="#999"/></svg>`)}`;

const TECH_ITEMS = [
  { name: 'Java', className: 'tech-java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', className: 'tech-spring', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'MySQL', className: 'tech-mysql', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Node.js', className: 'tech-node', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', className: 'tech-express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'PostgreSQL', className: 'tech-postgres', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Redis', className: 'tech-redis', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'Postman', className: 'tech-postman', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { name: 'Swagger', className: 'tech-swagger', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg' },
  { name: 'VS Code', className: 'tech-vscode', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'IntelliJ', className: 'tech-intellij', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
  { name: 'Eclipse', className: 'tech-eclipse', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg' },
  { name: 'Cursor', className: 'tech-cursor', src: CURSOR_LOGO }
];

export default function TechStack() {
  return (
    <section id="tech" className="glass-panel">
      <h2 className="section-title">
        <Cpu size={28} className="logo-dot" /> Tech Stack
      </h2>
      <p className="section-subtitle">&gt; mvn dependency:tree</p>

      <div className="tech-grid">
        {TECH_ITEMS.map((tech) => (
          <div key={tech.name} className={`glass-panel tech-card ${tech.className}`}>
            <div className="tech-icon-wrapper">
              <img src={tech.src} alt={`${tech.name} icon`} loading="lazy" />
            </div>
            <span className="tech-label">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
