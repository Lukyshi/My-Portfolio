import { useState } from 'react';
import { Layers, ArrowRight, ArrowDown } from 'lucide-react';

const LAYERS = [
  {
    id: 'client',
    name: 'Client / Presentation',
    tech: 'React / Postman / Mobile',
    role: 'Triggers requests and renders data. Communicates via HTTP requests (REST endpoints) or WebSocket connections.',
    code: `// HTTP GET Request
fetch('https://api.luizbangsoy.dev/api/tasks', {
  headers: { 'Authorization': 'Bearer eyJhbGc...' }
})
.then(res => res.json())
.then(data => renderTasks(data));`
  },
  {
    id: 'controller',
    name: 'Controller / Routing Layer',
    tech: 'Spring Boot Controller / Express Router',
    role: 'Entry point of the API. Responsible for routing, validating incoming payloads, enforcing auth middleware (JWT), and returning standard HTTP status codes.',
    code: `@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(taskService.create(dto));
    }
}`
  },
  {
    id: 'service',
    name: 'Service / Business Logic Layer',
    tech: 'Core Java Services / Node.js Services',
    role: 'Processes logic and handles rules. Sanitizes inputs, triggers transaction bounds, manages third-party callouts, and validates permissions before DB alterations.',
    code: `@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Transactional
    public Task create(TaskDTO dto) {
        // Enforce business validation rules
        if (dto.getDueDate().isBefore(LocalDate.now())) {
            throw new InvalidDateException("Due date cannot be in the past");
        }
        return taskRepository.save(new Task(dto));
    }
}`
  },
  {
    id: 'repository',
    name: 'Repository / ORM / Data Access',
    tech: 'Spring Data JPA (Hibernate) / Prisma Client',
    role: 'Abstractions to query the database. Connects DB objects directly to model classes, handling standard queries, custom joins, indexing, and transaction scopes.',
    code: `// Prisma Data Access query
const getActiveTasks = async (userId: number) => {
  return await prisma.task.findMany({
    where: {
      userId: userId,
      status: 'PENDING'
    },
    orderBy: { createdAt: 'desc' }
  });
};`
  },
  {
    id: 'database',
    name: 'Database Storage Layer',
    tech: 'MySQL / PostgreSQL / Redis',
    role: 'Physical storage of structured data. Enforces primary/foreign key relations, triggers, cascade patterns, indexing schemes, and transaction isolation levels.',
    code: `CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_user_status ON tasks(user_id, status);`
  }
];

export default function Architecture() {
  const [activeLayer, setActiveLayer] = useState('controller');

  const selectedLayer = LAYERS.find(l => l.id === activeLayer);

  return (
    <section id="architecture" className="glass-panel">
      <h2 className="section-title">
        <Layers size={28} className="logo-dot" /> System Architecture
      </h2>
      <p className="section-subtitle">&gt; cat ARCHITECTURE.md</p>

      <div className="arch-container">
        {/* Visual stack diagram */}
        <div className="arch-diagram">
          {LAYERS.map((layer, index) => (
            <div key={layer.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className={`arch-layer ${activeLayer === layer.id ? 'active' : ''}`}
                onClick={() => setActiveLayer(layer.id)}
                onMouseEnter={() => setActiveLayer(layer.id)}
              >
                <div className="layer-meta">
                  <span className="layer-num">0{index + 1}</span>
                  <span className="layer-name">{layer.name}</span>
                </div>
                <span className="layer-tech">{layer.tech}</span>
              </div>
              
              {index < LAYERS.length - 1 && (
                <div className="arch-arrow" style={{ margin: '8px 0' }}>
                  <ArrowDown size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Layer Explanatory Panel */}
        <div className="glass-panel layer-details-box">
          <h3 className="layer-details-title">
            <span style={{ color: 'var(--accent-cyan)' }}>[Layer 0{LAYERS.findIndex(l => l.id === activeLayer) + 1}]</span> {selectedLayer.name}
          </h3>
          <p className="layer-details-text" style={{ marginBottom: 16 }}>
            {selectedLayer.role}
          </p>
          
          <div className="code-container">
            <div className="code-header">
              <span>MOCK IMPLEMENTATION SNIPPET</span>
            </div>
            <pre className="code-body">
              <code style={{ color: 'var(--accent-cyan)' }}>
                {selectedLayer.code}
              </code>
            </pre>
          </div>
        </div>

        {/* Notes on Design Principles */}
        <div className="mvc-principles">
          <div className="glass-panel mvc-card">
            <h3>MVC Architecture</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              I apply Model-View-Controller isolation to clean up control flows. Controllers strictly parse input and return responses; Models define data representations; Services act as the logical router. This separation ensures that changing API routes or formats doesn't break business logic or database queries.
            </p>
          </div>
          <div className="glass-panel mvc-card">
            <h3>Modular Design & Clean Code</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              By adhering to SOLID principles, I write decoupled code. I enforce interface segregation to mock DB connections in unit testing, write stateless services to facilitate horizontal container scaling, and employ dependency injection patterns to keep dependencies explicit and modular.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
