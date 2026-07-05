import { User, Terminal } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="glass-panel">
      <h2 className="section-title">
        <User size={28} className="logo-dot" /> About Me
      </h2>
      <p className="section-subtitle">&gt; whoami</p>
      
      <div className="about-grid">
        <div className="about-text">
          <p>
            I am a dedicated <strong>Backend Developer</strong> focused on building clean, secure, and high-performance server-side applications. I specialize in designing and implementing scalable REST APIs, managing relational databases, and architecting systems with modularity and clean code in mind.
          </p>
          <p>
            With a solid foundation in the <strong>Java/Spring Boot</strong> enterprise ecosystem and modern <strong>Node.js/Express/TypeScript</strong> environments, I enjoy bridging the gap between database designs and client-facing endpoints. I focus on backend fundamentals like <strong>JWT authentication</strong>, <strong>Role-Based Access Control (RBAC)</strong>, <strong>caching strategies (Redis)</strong>, and robust <strong>relational database indexing</strong>.
          </p>
          <p>
            My engineering philosophy centers around the principle that a backend should be <em>secure by default, clean by design, and documented in detail</em>. I utilize tools like Swagger and Postman to ensure seamless API integrations and developer handoffs.
          </p>
        </div>
      </div>
    </section>
  );
}
