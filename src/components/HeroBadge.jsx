import { useState, useRef } from 'react';
import { Github, Linkedin, Download } from 'lucide-react';

export default function HeroBadge() {
  const badgeRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!badgeRef.current) return;

    const rect = badgeRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rotateX = -(mouseY / (height / 2)) * 12;
    const rotateY = (mouseX / (width / 2)) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-text-panel">
        <span className="hero-greetings">Hello, world / I build reliable systems.</span>
        <h1 className="hero-name">Luiz Bangsoy</h1>
        <p className="hero-tagline">Backend Developer crafting resilient APIs and data-driven products.</p>
        <p className="hero-description">
          I focus on secure architectures, scalable services, and polished developer experiences with Java,
          Spring Boot, Node.js, and relational databases.
        </p>

        <div className="hero-actions">
          <a href="/resume.pdf" download="Luiz_Bangsoy_Resume.pdf" className="btn btn-primary">
            <Download size={16} />
            Download Resume
          </a>
          <div className="hero-socials">
            <a href="https://github.com/Lukyshi" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/luiz-bangsoy-b3aa86359/" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-badge-panel">
        <div className="lanyard-wrapper">
          <div className="lanyard-lace" />
          <div className="lanyard-ring" />
          <div className="lanyard-clip" />

          <div
            ref={badgeRef}
            className="id-badge"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHovered
                ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(4px) scale(1.03)`
                : 'rotateX(0deg) rotateY(0deg)',
              transition: isHovered ? 'transform 0.05s linear' : 'transform 0.5s ease',
            }}
          >
            <div className="id-badge-slot" />

            <div className="id-badge-header">
              <span className="badge-logo">
                <span className="logo-slash">&lt;</span>
                LB
                <span className="logo-dot">/&gt;</span>
              </span>
              <div className="badge-chip">
                <div style={{
                  position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '15%',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px'
                }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
              </div>
            </div>

            <div className="id-badge-avatar-container">
              <img src="/profile.png" alt="Luiz Bangsoy Profile" className="id-badge-avatar" />
            </div>

            <div className="id-badge-info">
              <h2 className="id-badge-name">Luiz Bangsoy</h2>
              <div className="id-badge-title">Backend Developer</div>
            </div>

            <div className="id-badge-footer">
              <div className="id-badge-links">
                <a href="https://github.com/Lukyshi" target="_blank" rel="noopener noreferrer" className="id-badge-link" title="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/luiz-bangsoy-b3aa86359/" target="_blank" rel="noopener noreferrer" className="id-badge-link" title="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </div>

              <a href="/resume.pdf" download="Luiz_Bangsoy_Resume.pdf" className="btn btn-primary resume-btn">
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
