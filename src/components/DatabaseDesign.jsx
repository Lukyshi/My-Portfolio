import { Database, Table } from 'lucide-react';

const hospitalEntities = [
  {
    name: 'Patient',
    fields: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'name', type: 'VARCHAR' },
      { name: 'gender', type: 'VARCHAR' },
      { name: 'age', type: 'INT' },
      { name: 'patients_contact_number', type: 'VARCHAR' },
      { name: 'municipality', type: 'VARCHAR' },
      { name: 'disease', type: 'VARCHAR' }
    ]
  },
  {
    name: 'Doctor',
    fields: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'name_doc', type: 'VARCHAR' },
      { name: 'specialization', type: 'VARCHAR' },
      { name: 'contact_number', type: 'VARCHAR' },
      { name: 'schedule', type: 'VARCHAR' }
    ]
  },
  {
    name: 'Appointment',
    fields: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'patients_id', type: 'INT', key: 'FK' },
      { name: 'doctors_id', type: 'INT', key: 'FK' },
      { name: 'appointmentDate', type: 'DATE' },
      { name: 'appointmentTime', type: 'TIME' },
      { name: 'status', type: 'VARCHAR' }
    ]
  },
  {
    name: 'User',
    fields: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'username', type: 'VARCHAR' },
      { name: 'password', type: 'VARCHAR' },
      { name: 'role', type: 'VARCHAR' }
    ]
  },
  {
    name: 'RefreshToken',
    fields: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'token', type: 'TEXT' },
      { name: 'username', type: 'VARCHAR' },
      { name: 'expiryDate', type: 'DATETIME' }
    ]
  }
];

const taskEntities = [
  {
    name: 'User',
    fields: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'name', type: 'VARCHAR' },
      { name: 'email', type: 'VARCHAR' },
      { name: 'passwordHash', type: 'VARCHAR' },
      { name: 'createdAt', type: 'DATETIME' }
    ]
  },
  {
    name: 'Task',
    fields: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'userId', type: 'INT', key: 'FK' },
      { name: 'title', type: 'VARCHAR' },
      { name: 'description', type: 'TEXT' },
      { name: 'status', type: 'ENUM' },
      { name: 'dueDate', type: 'DATE' },
      { name: 'deleteAt', type: 'DATETIME' },
      { name: 'createdAt', type: 'DATETIME' }
    ]
  },
  {
    name: 'ActivityLog',
    fields: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'userId', type: 'INT', key: 'FK' },
      { name: 'taskId', type: 'INT', key: 'FK' },
      { name: 'action', type: 'VARCHAR' },
      { name: 'createdAt', type: 'DATETIME' }
    ]
  }
];

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

export default function DatabaseDesign() {
  return (
    <section id="database" className="glass-panel">
      <h2 className="section-title">
        <Database size={28} className="logo-dot" /> Database Design
      </h2>
      <p className="section-subtitle">&gt; show schemas;</p>

      <div className="db-container">
        <div className="db-project-card">
          <div className="db-project-header">
            <h3>Real-Time Collaboration Platform API</h3>
            <span className="db-project-status">In progress</span>
          </div>
          <p className="db-project-description">
            This schema centers on workspace-based collaboration, with roles, task management, chat, notifications, presence, invitations, and audit logging all connected through shared workspace and user entities.
          </p>

          <div className="db-entity-grid">
            <EntityCard title="User" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'name', type: 'String' },
              { name: 'email', type: 'String', key: 'UNIQUE' },
              { name: 'passwordHash', type: 'String' },
              { name: 'isVerified', type: 'Boolean' },
              { name: 'createdAt', type: 'DateTime' },
              { name: 'updatedAt', type: 'DateTime' }
            ]} />
            <EntityCard title="Workspace" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'name', type: 'String' },
              { name: 'description', type: 'String?' },
              { name: 'ownerId', type: 'String', key: 'FK' },
              { name: 'createdAt', type: 'DateTime' },
              { name: 'updatedAt', type: 'DateTime' }
            ]} />
            <EntityCard title="WorkspaceMember" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'workspaceId', type: 'String', key: 'FK' },
              { name: 'userId', type: 'String', key: 'FK' },
              { name: 'role', type: 'WorkspaceRole' },
              { name: 'joinedAt', type: 'DateTime' }
            ]} />
            <EntityCard title="Project" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'workspaceId', type: 'String', key: 'FK' },
              { name: 'name', type: 'String' },
              { name: 'description', type: 'String?' },
              { name: 'createdById', type: 'String', key: 'FK' },
              { name: 'createdAt', type: 'DateTime' },
              { name: 'updatedAt', type: 'DateTime' }
            ]} />
            <EntityCard title="Task" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'projectId', type: 'String', key: 'FK' },
              { name: 'title', type: 'String' },
              { name: 'description', type: 'String?' },
              { name: 'status', type: 'TaskStatus' },
              { name: 'priority', type: 'TaskPriority' },
              { name: 'assignedToId', type: 'String?', key: 'FK' },
              { name: 'createdById', type: 'String', key: 'FK' },
              { name: 'due_date', type: 'DateTime?' },
              { name: 'createdAt', type: 'DateTime' },
              { name: 'updatedAt', type: 'DateTime' }
            ]} />
            <EntityCard title="Conversation" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'type', type: 'ConversationType' },
              { name: 'createdAt', type: 'DateTime' }
            ]} />
            <EntityCard title="Message" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'conversationId', type: 'String', key: 'FK' },
              { name: 'senderId', type: 'String', key: 'FK' },
              { name: 'content', type: 'String' },
              { name: 'messageType', type: 'MessageType' },
              { name: 'createdAt', type: 'DateTime' }
            ]} />
            <EntityCard title="Notification" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'userId', type: 'String', key: 'FK' },
              { name: 'type', type: 'NotificationType' },
              { name: 'message', type: 'String' },
              { name: 'isRead', type: 'Boolean' },
              { name: 'createdAt', type: 'DateTime' }
            ]} />
            <EntityCard title="ActivityLog" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'workspaceId', type: 'String', key: 'FK' },
              { name: 'userId', type: 'String', key: 'FK' },
              { name: 'action', type: 'ActivityAction' },
              { name: 'entityType', type: 'String' },
              { name: 'entityId', type: 'String' },
              { name: 'createdAt', type: 'DateTime' }
            ]} />
            <EntityCard title="WorkspaceInvitation" fields={[
              { name: 'id', type: 'String', key: 'PK' },
              { name: 'workspaceId', type: 'String', key: 'FK' },
              { name: 'invitedById', type: 'String', key: 'FK' },
              { name: 'email', type: 'String' },
              { name: 'token', type: 'String', key: 'UNIQUE' },
              { name: 'status', type: 'InvitationStatus' },
              { name: 'acceptedAt', type: 'DateTime?' },
              { name: 'expiresAt', type: 'DateTime' },
              { name: 'createdAt', type: 'DateTime' }
            ]} />
          </div>

          <div className="db-relationship-row">
            <span>User 1 ─── many WorkspaceMember</span>
            <span>Workspace 1 ─── many Project / Task / Invitation / ActivityLog</span>
            <span>Conversation 1 ─── many Message</span>
          </div>
        </div>

        <div className="db-project-card">
          <div className="db-project-header">
            <h3>Hospital Management API</h3>
            <span className="db-project-status">ER model</span>
          </div>
          <p className="db-project-description">
            Patient and doctor records are linked through appointment transactions, while authentication relies on standalone user and refresh token tables.
          </p>
          <div className="db-entity-grid">
            {hospitalEntities.map((entity) => (
              <EntityCard key={entity.name} title={entity.name} fields={entity.fields} />
            ))}
          </div>
          <div className="db-relationship-row">
            <span>Patient 1 ─── many Appointment</span>
            <span>Doctor 1 ─── many Appointment</span>
            <span>User / RefreshToken are standalone auth tables</span>
          </div>
        </div>

        <div className="db-project-card">
          <div className="db-project-header">
            <h3>Task Management API</h3>
            <span className="db-project-status">ER model</span>
          </div>
          <p className="db-project-description">
            The schema mirrors a task-centric workflow where users own tasks, and every task or user action can be audited through activity logs.
          </p>
          <div className="db-entity-grid">
            {taskEntities.map((entity) => (
              <EntityCard key={entity.name} title={entity.name} fields={entity.fields} />
            ))}
          </div>
          <div className="db-relationship-row">
            <span>User 1 ─── many Task</span>
            <span>User 1 ─── many ActivityLog</span>
            <span>Task 1 ─── many ActivityLog (nullable taskId)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
