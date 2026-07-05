import { Award } from 'lucide-react';

const CERTS = [
  {
    title: 'Certificate of Participation — Power Up: Game Development Bootcamp',
    issuer: 'Department of Science and Technology (DOST), National Capital Region (NCR)',
    date: 'Aug 2025'
  },
  {
    title: 'Certificate of Participation — "CNTRL + ALT + COMPETE: Resetting Limits, Competing with Passion" (CS Week)',
    issuer: 'Immaculada Concepcion College, Department of Computer Science',
    date: 'Oct 2025'
  },
  {
    title: 'Certificate of Participation — Mastering Coding Skills: A Roadmap to Excellence',
    issuer: 'Immaculada Concepcion College, Department of Computer Science',
    date: 'Dec 2023'
  },
  {
    title: "President's List Certificate — 1st Year, 2nd Semester",
    issuer: 'Immaculada Concepcion College, Department of Computer Science',
    date: 'Jan 2024'
  },
  {
    title: "President's List Certificate — 2nd Year",
    issuer: 'Immaculada Concepcion College, Department of Computer Science',
    date: 'Dec 2025'
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="glass-panel">
      <h2 className="section-title">
        <Award size={28} className="logo-dot" /> Certifications & Awards
      </h2>
      <p className="section-subtitle">&gt; ls ./certificates</p>
      
      <div className="certs-grid">
        {CERTS.map((cert, index) => (
          <div key={index} className="glass-panel cert-card">
            <div className="cert-icon-wrapper">
              <Award size={24} />
            </div>
            <div className="cert-info">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-date">{cert.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
