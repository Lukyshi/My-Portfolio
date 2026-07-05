import { ShieldCheck, Server, Key, GitFork, Database, Zap, BookOpen, Globe } from 'lucide-react';

const CONCEPTS = [
  {
    title: 'REST API Design',
    icon: <Globe size={22} className="logo-dot" />,
    description: 'Designing clean, stateless, resource-oriented endpoints. Leveraging semantic HTTP verbs (GET, POST, PUT, DELETE), RESTful URLs, proper status codes (2xx, 4xx, 5xx), and standard JSON payloads.'
  },
  {
    title: 'JWT Authentication',
    icon: <Key size={22} className="logo-dot" />,
    description: 'Securing API endpoints using JSON Web Tokens. Architecting authentication flows with token signing, token payload encryption, expiration thresholds, and secure bearer headers.'
  },
  {
    title: 'Role-Based Access Control (RBAC)',
    icon: <ShieldCheck size={22} className="logo-dot" />,
    description: 'Enforcing granular permission boundaries. Setting up endpoint-level security guards (e.g. Spring Security PreAuthorize roles) to restrict access to ADMIN, DOCTOR, or USER roles.'
  },
  {
    title: 'Layered & MVC Architecture',
    icon: <Server size={22} className="logo-dot" />,
    description: 'Decoupling application codebases. Restricting responsibilities to Controller, Service, and Repository layers to enforce separation of concerns and enable mock-based unit testing.'
  },
  {
    title: 'ORM Integration',
    icon: <GitFork size={22} className="logo-dot" />,
    description: 'Bridging object-oriented models to relational database schemas. Extensive experience writing JPA/Hibernate entities in Java, and TypeScript models using Prisma client in Node.js.'
  },
  {
    title: 'Database Design',
    icon: <Database size={22} className="logo-dot" />,
    description: 'Designing third-normal-form (3NF) relational tables. Managing complex table schemas, relational cascade structures, foreign key safety, and custom query indexing.'
  },
  {
    title: 'Caching (Redis)',
    icon: <Zap size={22} className="logo-dot" />,
    description: 'Accelerating data throughput and reducing query latency. Implementing cache-aside architectures with Redis to cache volatile or heavy query results and manage session tokens.'
  },
  {
    title: 'API Documentation',
    icon: <BookOpen size={22} className="logo-dot" />,
    description: 'Fostering developer collaboration by providing clean Swagger UI (OpenAPI specification) pages and robust Postman collections for sandbox testing.'
  }
];

export default function SkillsConcepts() {
  return (
    <section id="skills" className="glass-panel">
      <h2 className="section-title">
        <ShieldCheck size={28} className="logo-dot" /> Skills & Backend Concepts
      </h2>
      <p className="section-subtitle">&gt; bin/system-check --skills</p>
      
      <div className="concepts-grid">
        {CONCEPTS.map((concept) => (
          <div key={concept.title} className="glass-panel concept-card">
            <div className="concept-card-title">
              {concept.icon}
              <h3>{concept.title}</h3>
            </div>
            <p className="concept-card-desc">{concept.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
