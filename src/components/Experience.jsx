import { Calendar, Briefcase, GraduationCap } from 'lucide-react';

const WORK_EXPERIENCE = [
  {
    title: 'Freelance Backend Developer',
    company: 'Independent Contracts',
    date: 'Oct 2025 - Present',
    details: [
      'Architected and deployed production-ready REST APIs for client web applications using Node.js, Express, and MySQL.',
      'Implemented robust stateless authentication models using JWT and customized middleware for role validation.',
      'Documented endpoints using Postman collections, improving client integration turnaround times.',
      'Configured Prisma ORM schemas, managing database migrations and table relationships.'
    ]
  }
];

const EDUCATION = [
  {
    title: 'Department of Science and Technology (DOST) NCR Bootcamp',
    company: 'Power Up: Game Development Bootcamper',
    date: 'Aug 2025',
    details: [
      'Selected to participate in a rigorous Game Development training bootcamp hosted by DOST.',
      'Programmed structural gameplay logic, handling loops, object states, and collision variables.',
      'Collaborated with a small developer team to prototype and launch interactive gaming concepts.'
    ]
  },
  {
    title: 'BS Computer Science Student',
    company: 'Immaculada Concepcion College (ICC)',
    date: '2022 - Present',
    details: [
      'Pursuing a Bachelor of Science in Computer Science, focusing on algorithms, database design, and object-oriented programming.',
      'Awarded President\'s List certificate for academic excellence during 1st Year, 2nd Semester (Jan 2024) and 2nd Year (Dec 2025).',
      'Actively participated and competed in computer science week hackathons and roadmap seminars (Mastering Coding Skills).'
    ]
  }
];

function TimelineGroup({ title, icon, items, variant }) {
  return (
    <div className="experience-group">
      <div className="experience-group-label">
        {icon}
        <h3>{title}</h3>
      </div>
      <div className="experience-timeline">
        {items.map((exp, index) => (
          <div key={index} className={`experience-item experience-item--${variant}`}>
            <div className="experience-header">
              <div>
                <h3 className="experience-title">{exp.title}</h3>
                <span className="experience-company">{exp.company}</span>
              </div>
              <span className="experience-date">{exp.date}</span>
            </div>
            <ul className="experience-details">
              {exp.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="glass-panel">
      <h2 className="section-title">
        <Calendar size={28} className="logo-dot" /> Experience Timeline
      </h2>
      <p className="section-subtitle">&gt; history | grep "work"</p>

      <TimelineGroup
        title="Work Experience"
        icon={<Briefcase size={18} />}
        items={WORK_EXPERIENCE}
        variant="work"
      />

      <TimelineGroup
        title="Education & Training"
        icon={<GraduationCap size={18} />}
        items={EDUCATION}
        variant="education"
      />
    </section>
  );
}
