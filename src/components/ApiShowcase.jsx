import { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

const ENDPOINTS = [
  {
    id: 'register',
    method: 'POST',
    path: '/api/auth/register',
    description: 'Registers a new user for the Hospital Management or Task Management backend.',
    request: {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Luiz Bangsoy',
        email: 'luiz@example.com',
        password: 'StrongPassword123'
      }, null, 2)
    },
    response: {
      status: '201 Created',
      body: JSON.stringify({
        message: 'User registered successfully'
      }, null, 2)
    }
  },
  {
    id: 'login',
    method: 'POST',
    path: '/api/auth/login',
    description: 'Authenticates a user and returns access and refresh tokens.',
    request: {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'luiz@example.com',
        password: 'StrongPassword123'
      }, null, 2)
    },
    response: {
      status: '200 OK',
      body: JSON.stringify({
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'user_123',
          name: 'Luiz Bangsoy',
          email: 'luiz@example.com',
          role: 'USER'
        }
      }, null, 2)
    }
  },
  {
    id: 'get-doctors',
    method: 'GET',
    path: '/api/doctors',
    description: 'Lists doctors from the Hospital Management API. Access is role-based.',
    request: {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        'Content-Type': 'application/json'
      },
      body: '// No body required'
    },
    response: {
      status: '200 OK',
      body: JSON.stringify([
        {
          id: 1,
          nameDoc: 'Dr. Maria Santos',
          specialization: 'Cardiology',
          contactNumber: '+639171234567',
          schedule: 'Mon-Fri 08:00-17:00'
        }
      ], null, 2)
    }
  },
  {
    id: 'create-appointment',
    method: 'POST',
    path: '/api/appointment',
    description: 'Creates a new medical appointment in the Hospital Management API.',
    request: {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patientsId: 1,
        doctorsId: 2,
        appointmentDate: '2026-07-10',
        appointmentTime: '14:30',
        status: 'PENDING'
      }, null, 2)
    },
    response: {
      status: '201 Created',
      body: JSON.stringify({
        id: 10,
        patientsId: 1,
        doctorsId: 2,
        appointmentDate: '2026-07-10',
        appointmentTime: '14:30',
        status: 'PENDING'
      }, null, 2)
    }
  },
  {
    id: 'get-tasks',
    method: 'GET',
    path: '/api/tasks',
    description: 'Fetches the authenticated user\'s tasks from the Task Management API.',
    request: {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        'Content-Type': 'application/json'
      },
      body: '// Optional query: /api/tasks?status=TODO'
    },
    response: {
      status: '200 OK',
      body: JSON.stringify([
        {
          id: 'task_001',
          title: 'Review API documentation',
          description: 'Finalize the backend endpoint notes for the portfolio.',
          status: 'TODO',
          priority: 'HIGH'
        }
      ], null, 2)
    }
  },
  {
    id: 'create-task',
    method: 'POST',
    path: '/api/tasks',
    description: 'Creates a new task in the Task Management API.',
    request: {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Ship documentation',
        description: 'Prepare onboarding notes',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: '2026-07-15T00:00:00.000Z'
      }, null, 2)
    },
    response: {
      status: '201 Created',
      body: JSON.stringify({
        id: 'task_002',
        title: 'Ship documentation',
        description: 'Prepare onboarding notes',
        status: 'TODO',
        priority: 'HIGH'
      }, null, 2)
    }
  }
];

export default function ApiShowcase() {
  const [activeTab, setActiveTab] = useState(ENDPOINTS[0].id);
  const [copiedState, setCopiedState] = useState({ req: false, res: false });

  const activeEndpoint = ENDPOINTS.find((ep) => ep.id === activeTab);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedState((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopiedState((prev) => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const getMethodClass = (method) => {
    switch (method) {
      case 'POST': return 'method-post';
      case 'GET': return 'method-get';
      case 'PUT': return 'method-put';
      case 'PATCH': return 'method-put';
      case 'DELETE': return 'method-delete';
      default: return '';
    }
  };

  return (
    <section id="api" className="glass-panel">
      <h2 className="section-title">
        <Terminal size={28} className="logo-dot" /> API Showcase
      </h2>
      <p className="section-subtitle">&gt; curl -X GET /api/v1/endpoints</p>
      
      <div className="api-showcase-container">
        {/* Endpoint Navigation Sidebar */}
        <div className="api-endpoints-sidebar">
          {ENDPOINTS.map((ep) => (
            <button
              key={ep.id}
              className={`endpoint-btn ${activeTab === ep.id ? 'active' : ''}`}
              onClick={() => setActiveTab(ep.id)}
            >
              <span className={`endpoint-method ${getMethodClass(ep.method)}`}>
                {ep.method}
              </span>
              <span className="endpoint-path">{ep.path}</span>
            </button>
          ))}
        </div>

        {/* Selected Endpoint Details Panel */}
        <div className="glass-panel api-details-panel">
          <div className="api-details-header">
            <div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: 4 }}>
                {activeEndpoint.description}
              </p>
            </div>
          </div>

          <div className="api-url-bar" style={{ marginBottom: 20 }}>
            <span className={`endpoint-method ${getMethodClass(activeEndpoint.method)}`}>
              {activeEndpoint.method}
            </span>
            <span className="api-url">
              https://api.luizbangsoy.dev{activeEndpoint.path}
            </span>
          </div>

          <div className="api-grid">
            {/* Request Block */}
            <div className="code-container">
              <div className="code-header">
                <span>REQUEST PAYLOAD</span>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(activeEndpoint.request.body, 'req')}
                >
                  {copiedState.req ? <Check size={14} className="logo-dot" /> : <Copy size={14} />}
                  <span>{copiedState.req ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="code-body">
                <code>
                  {`// Headers\n`}
                  {Object.entries(activeEndpoint.request.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}
                  {`\n\n// Body\n`}
                  {activeEndpoint.request.body}
                </code>
              </pre>
            </div>

            {/* Response Block */}
            <div className="code-container">
              <div className="code-header">
                <span>RESPONSE (Status: {activeEndpoint.response.status})</span>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(activeEndpoint.response.body, 'res')}
                >
                  {copiedState.res ? <Check size={14} className="logo-dot" /> : <Copy size={14} />}
                  <span>{copiedState.res ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="code-body">
                <code>
                  {`// Response Headers\n`}
                  {`Content-Type: application/json\n`}
                  {`Status-Code: ${activeEndpoint.response.status}\n\n`}
                  {`// Body\n`}
                  {activeEndpoint.response.body}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
