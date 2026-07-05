import { useState } from 'react';
import { Folder, ExternalLink, Github, Layers, Database, Terminal, Copy, Check, Table, ArrowDown, ChevronDown, ChevronRight } from 'lucide-react';

/* ────────────────────────────────────────────
   Architecture data per project
   ──────────────────────────────────────────── */
const ARCH_DATA = {
  'Hospital Management API': {
    layers: [
      { name: 'Controller Layer', tech: 'Spring Boot @RestController', code: `@RestController\n@RequestMapping("/api/tasks")\npublic class TaskController {\n    @Autowired\n    private TaskService taskService;\n\n    @PostMapping\n    public ResponseEntity<Task> createTask(\n        @Valid @RequestBody TaskDTO dto) {\n        return ResponseEntity.status(HttpStatus.CREATED)\n                             .body(taskService.create(dto));\n    }\n}` },
      { name: 'Service Layer', tech: 'Java Services + @Transactional', code: `@Service\npublic class TaskService {\n    @Autowired\n    private TaskRepository taskRepository;\n\n    @Transactional\n    public Task create(TaskDTO dto) {\n        if (dto.getDueDate().isBefore(LocalDate.now())) {\n            throw new InvalidDateException(\n                "Due date cannot be in the past");\n        }\n        return taskRepository.save(new Task(dto));\n    }\n}` },
      { name: 'Repository Layer', tech: 'Spring Data JPA (Hibernate)', code: `public interface TaskRepository\n    extends JpaRepository<Task, Long> {\n    List<Task> findByUserId(Long userId);\n    List<Task> findByStatus(String status);\n}` }
    ]
  },
  'Task Management API': {
    layers: [
      { name: 'Router Layer', tech: 'Express Router + Middleware', code: `router.get('/api/tasks',\n  authMiddleware,\n  taskController.getAll\n);\nrouter.post('/api/tasks',\n  authMiddleware,\n  validate(taskSchema),\n  taskController.create\n);` },
      { name: 'Service Layer', tech: 'Node.js Business Logic', code: `export const createTask = async (userId, dto) => {\n  if (new Date(dto.dueDate) < new Date()) {\n    throw new AppError('Due date in the past', 400);\n  }\n  return prisma.task.create({\n    data: { ...dto, userId }\n  });\n};` },
      { name: 'Data Access', tech: 'Prisma Client (MySQL)', code: `const getActiveTasks = async (userId) => {\n  return await prisma.task.findMany({\n    where: { userId, status: 'PENDING' },\n    orderBy: { createdAt: 'desc' }\n  });\n};` }
    ]
  },
  'Real-Time Collaboration Platform API': {
    layers: [
      { name: 'Gateway Layer', tech: 'WebSocket + Express Router', code: `io.on('connection', (socket) => {\n  socket.on('join:workspace', (wsId) => {\n    socket.join(\`ws:\${wsId}\`);\n    io.to(\`ws:\${wsId}\`).emit(\n      'presence:update', getOnlineUsers(wsId)\n    );\n  });\n});` },
      { name: 'Service Layer', tech: 'TypeScript Services + Redis', code: `export class WorkspaceService {\n  async addMember(\n    workspaceId: string,\n    userId: string,\n    role: WorkspaceRole\n  ) {\n    await redis.del(\`ws:members:\${workspaceId}\`);\n    return prisma.workspaceMember.create({\n      data: { workspaceId, userId, role }\n    });\n  }\n}` },
      { name: 'Data Access', tech: 'Prisma Client (PostgreSQL)', code: `model Workspace {\n  id          String @id @default(cuid())\n  name        String\n  ownerId     String\n  owner       User @relation(fields: [ownerId])\n  members     WorkspaceMember[]\n  projects    Project[]\n  createdAt   DateTime @default(now())\n}` }
    ]
  }
};

/* ────────────────────────────────────────────
   Database entities per project
   ──────────────────────────────────────────── */
const DB_DATA = {
  'Hospital Management API': {
    entities: [
      { name: 'Patient', fields: [{ name: 'id', type: 'INT', key: 'PK' }, { name: 'name', type: 'VARCHAR' }, { name: 'gender', type: 'VARCHAR' }, { name: 'age', type: 'INT' }, { name: 'disease', type: 'VARCHAR' }] },
      { name: 'Doctor', fields: [{ name: 'id', type: 'INT', key: 'PK' }, { name: 'name_doc', type: 'VARCHAR' }, { name: 'specialization', type: 'VARCHAR' }, { name: 'schedule', type: 'VARCHAR' }] },
      { name: 'Appointment', fields: [{ name: 'id', type: 'INT', key: 'PK' }, { name: 'patients_id', type: 'INT', key: 'FK' }, { name: 'doctors_id', type: 'INT', key: 'FK' }, { name: 'appointmentDate', type: 'DATE' }, { name: 'status', type: 'VARCHAR' }] },
      { name: 'User', fields: [{ name: 'id', type: 'INT', key: 'PK' }, { name: 'username', type: 'VARCHAR' }, { name: 'password', type: 'VARCHAR' }, { name: 'role', type: 'VARCHAR' }] }
    ],
    relations: ['Patient 1 ─── many Appointment', 'Doctor 1 ─── many Appointment']
  },
  'Task Management API': {
    entities: [
      { name: 'User', fields: [{ name: 'id', type: 'INT', key: 'PK' }, { name: 'name', type: 'VARCHAR' }, { name: 'email', type: 'VARCHAR' }, { name: 'passwordHash', type: 'VARCHAR' }] },
      { name: 'Task', fields: [{ name: 'id', type: 'INT', key: 'PK' }, { name: 'userId', type: 'INT', key: 'FK' }, { name: 'title', type: 'VARCHAR' }, { name: 'status', type: 'ENUM' }, { name: 'dueDate', type: 'DATE' }] },
      { name: 'ActivityLog', fields: [{ name: 'id', type: 'INT', key: 'PK' }, { name: 'userId', type: 'INT', key: 'FK' }, { name: 'taskId', type: 'INT', key: 'FK' }, { name: 'action', type: 'VARCHAR' }] }
    ],
    relations: ['User 1 ─── many Task', 'User 1 ─── many ActivityLog']
  },
  'Real-Time Collaboration Platform API': {
    entities: [
      { name: 'User', fields: [{ name: 'id', type: 'String', key: 'PK' }, { name: 'name', type: 'String' }, { name: 'email', type: 'String', key: 'UNIQUE' }, { name: 'isVerified', type: 'Boolean' }] },
      { name: 'Workspace', fields: [{ name: 'id', type: 'String', key: 'PK' }, { name: 'name', type: 'String' }, { name: 'ownerId', type: 'String', key: 'FK' }] },
      { name: 'WorkspaceMember', fields: [{ name: 'id', type: 'String', key: 'PK' }, { name: 'workspaceId', type: 'String', key: 'FK' }, { name: 'userId', type: 'String', key: 'FK' }, { name: 'role', type: 'WorkspaceRole' }] },
      { name: 'Task', fields: [{ name: 'id', type: 'String', key: 'PK' }, { name: 'projectId', type: 'String', key: 'FK' }, { name: 'title', type: 'String' }, { name: 'status', type: 'TaskStatus' }, { name: 'assignedToId', type: 'String?', key: 'FK' }] },
      { name: 'Message', fields: [{ name: 'id', type: 'String', key: 'PK' }, { name: 'conversationId', type: 'String', key: 'FK' }, { name: 'senderId', type: 'String', key: 'FK' }, { name: 'content', type: 'String' }] }
    ],
    relations: ['User 1 ─── many WorkspaceMember', 'Workspace 1 ─── many Project / Task', 'Conversation 1 ─── many Message']
  }
};

/* ────────────────────────────────────────────
   API endpoint data per project
   ──────────────────────────────────────────── */
const API_DATA = {
  'Hospital Management API': [
    {
      method: 'POST', path: '/api/auth/login',
      description: 'Authenticates a user and returns JWT tokens.',
      request: JSON.stringify({ email: 'luiz@example.com', password: 'StrongPassword123' }, null, 2),
      response: JSON.stringify({ accessToken: 'eyJhbGciOiJIUzI1NiIs...', refreshToken: 'eyJhbGciOiJIUzI1NiIs...', user: { id: 'user_123', name: 'Luiz Bangsoy', role: 'USER' } }, null, 2),
      status: '200 OK'
    },
    {
      method: 'POST', path: '/api/appointment',
      description: 'Creates a new medical appointment.',
      request: JSON.stringify({ patientsId: 1, doctorsId: 2, appointmentDate: '2026-07-10', appointmentTime: '14:30', status: 'PENDING' }, null, 2),
      response: JSON.stringify({ id: 10, patientsId: 1, doctorsId: 2, appointmentDate: '2026-07-10', status: 'PENDING' }, null, 2),
      status: '201 Created'
    }
  ],
  'Task Management API': [
    {
      method: 'GET', path: '/api/tasks',
      description: 'Fetches the authenticated user\'s tasks.',
      request: '// Headers: Authorization: Bearer <token>\n// Optional query: ?status=TODO',
      response: JSON.stringify([{ id: 'task_001', title: 'Review API documentation', status: 'TODO', priority: 'HIGH' }], null, 2),
      status: '200 OK'
    },
    {
      method: 'POST', path: '/api/tasks',
      description: 'Creates a new task.',
      request: JSON.stringify({ title: 'Ship documentation', description: 'Prepare onboarding notes', status: 'TODO', priority: 'HIGH', dueDate: '2026-07-15T00:00:00.000Z' }, null, 2),
      response: JSON.stringify({ id: 'task_002', title: 'Ship documentation', status: 'TODO', priority: 'HIGH' }, null, 2),
      status: '201 Created'
    }
  ],
  'Real-Time Collaboration Platform API': [
    {
      method: 'POST', path: '/api/workspaces',
      description: 'Creates a new workspace.',
      request: JSON.stringify({ name: 'Engineering Team', description: 'Main engineering workspace' }, null, 2),
      response: JSON.stringify({ id: 'ws_001', name: 'Engineering Team', ownerId: 'user_123', createdAt: '2026-07-06T00:00:00.000Z' }, null, 2),
      status: '201 Created'
    },
    {
      method: 'POST', path: '/api/workspaces/:id/invite',
      description: 'Invites a user to a workspace via email.',
      request: JSON.stringify({ email: 'dev@example.com', role: 'MEMBER' }, null, 2),
      response: JSON.stringify({ id: 'inv_001', email: 'dev@example.com', status: 'PENDING', expiresAt: '2026-07-13T00:00:00.000Z' }, null, 2),
      status: '201 Created'
    }
  ]
};

/* ────────────────────────────────────────────
   Project definitions
   ──────────────────────────────────────────── */
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

/* ────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────── */

function EntityCard({ title, fields }) {
  return (
    <div className="db-entity-card">
      <div className="db-entity-header">
        <Table size={14} className="db-table-header-icon" />
        <span>{title}</span>
      </div>
      <div className="db-entity-rows">
        {fields.map((field) => (
          <div className="db-entity-row" key={`${title}-${field.name}`}>
            <span className="db-col-name">
              {field.key ? <span className="db-key">{field.key}</span> : null}
              {field.name}
            </span>
            <span className="db-col-type">{field.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchitectureTab({ projectTitle }) {
  const data = ARCH_DATA[projectTitle];
  if (!data) return null;
  return (
    <div className="project-tab-inner">
      <div className="arch-mini-stack">
        {data.layers.map((layer, i) => (
          <div key={i}>
            <div className="arch-mini-layer">
              <div className="layer-meta">
                <span className="layer-num">0{i + 1}</span>
                <span className="layer-name">{layer.name}</span>
              </div>
              <span className="layer-tech">{layer.tech}</span>
            </div>
            <div className="code-container" style={{ marginTop: 8, marginBottom: i < data.layers.length - 1 ? 12 : 0 }}>
              <div className="code-header"><span>IMPLEMENTATION</span></div>
              <pre className="code-body"><code style={{ color: 'var(--accent-cyan)' }}>{layer.code}</code></pre>
            </div>
            {i < data.layers.length - 1 && (
              <div className="arch-arrow" style={{ margin: '8px 0', display: 'flex', justifyContent: 'center' }}>
                <ArrowDown size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DatabaseTab({ projectTitle }) {
  const data = DB_DATA[projectTitle];
  if (!data) return null;
  return (
    <div className="project-tab-inner">
      <div className="db-entity-grid">{data.entities.map((e) => <EntityCard key={e.name} title={e.name} fields={e.fields} />)}</div>
      <div className="db-relationship-row" style={{ marginTop: 12 }}>
        {data.relations.map((r, i) => <span key={i}>{r}</span>)}
      </div>
    </div>
  );
}

function ApiTab({ projectTitle }) {
  const endpoints = API_DATA[projectTitle];
  const [copiedIdx, setCopiedIdx] = useState(null);
  if (!endpoints) return null;

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getMethodClass = (m) => {
    switch (m) {
      case 'POST': return 'method-post';
      case 'GET': return 'method-get';
      case 'PUT': return 'method-put';
      case 'DELETE': return 'method-delete';
      default: return '';
    }
  };

  return (
    <div className="project-tab-inner">
      {endpoints.map((ep, i) => (
        <div key={i} className="api-endpoint-compact" style={{ marginBottom: i < endpoints.length - 1 ? 16 : 0 }}>
          <div className="api-url-bar" style={{ marginBottom: 8 }}>
            <span className={`endpoint-method ${getMethodClass(ep.method)}`}>{ep.method}</span>
            <span className="api-url">{ep.path}</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{ep.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div className="code-container">
              <div className="code-header">
                <span>REQUEST</span>
                <button className="copy-btn" onClick={() => copy(ep.request, `req-${i}`)}>
                  {copiedIdx === `req-${i}` ? <Check size={12} className="logo-dot" /> : <Copy size={12} />}
                </button>
              </div>
              <pre className="code-body"><code>{ep.request}</code></pre>
            </div>
            <div className="code-container">
              <div className="code-header">
                <span>RESPONSE ({ep.status})</span>
                <button className="copy-btn" onClick={() => copy(ep.response, `res-${i}`)}>
                  {copiedIdx === `res-${i}` ? <Check size={12} className="logo-dot" /> : <Copy size={12} />}
                </button>
              </div>
              <pre className="code-body"><code>{ep.response}</code></pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Projects component
   ──────────────────────────────────────────── */
export default function Projects() {
  // Each project can have one active tab: null | 'architecture' | 'database' | 'api'
  const [openTabs, setOpenTabs] = useState({});

  const toggleTab = (projectTitle, tab) => {
    setOpenTabs((prev) => ({
      ...prev,
      [projectTitle]: prev[projectTitle] === tab ? null : tab
    }));
  };

  return (
    <section id="projects" className="glass-panel">
      <h2 className="section-title">
        <Folder size={28} className="logo-dot" /> Featured Projects
      </h2>
      <p className="section-subtitle">&gt; git log --oneline -n 3</p>

      <div className="projects-list">
        {PROJECTS.map((project, index) => {
          const activeTab = openTabs[project.title] || null;

          return (
            <div key={index} className="glass-panel project-card-v2">
              {/* Editor-like Tab Header */}
              <div className="project-card-file-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                    background: project.status === 'in-progress' ? '#f59e0b' : 'var(--accent-green)'
                  }} />
                  <span>{project.fileName}</span>
                </div>
                <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Project Info */}
              <div className="project-body">
                <div className="project-meta">
                  <h3 className="project-title">{project.title}</h3>
                  {project.status === 'in-progress' && <span className="badge badge-progress">In Progress</span>}
                  {project.status === 'completed' && <span className="badge badge-success">Completed</span>}
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tech.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>

                {/* Expandable Detail Tabs */}
                <div className="project-detail-tabs">
                  <div className="project-tab-bar">
                    {[
                      { key: 'architecture', icon: <Layers size={14} />, label: 'Architecture' },
                      { key: 'database', icon: <Database size={14} />, label: 'Database' },
                      { key: 'api', icon: <Terminal size={14} />, label: 'API' }
                    ].map(({ key, icon, label }) => (
                      <button
                        key={key}
                        className={`project-tab-btn ${activeTab === key ? 'active' : ''}`}
                        onClick={() => toggleTab(project.title, key)}
                      >
                        {icon}
                        <span>{label}</span>
                        {activeTab === key ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  {activeTab && (
                    <div className="project-tab-content">
                      {activeTab === 'architecture' && <ArchitectureTab projectTitle={project.title} />}
                      {activeTab === 'database' && <DatabaseTab projectTitle={project.title} />}
                      {activeTab === 'api' && <ApiTab projectTitle={project.title} />}
                    </div>
                  )}
                </div>

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Github size={16} /> View Repository
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
