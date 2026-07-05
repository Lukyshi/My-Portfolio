import { useState, useRef, useEffect, useCallback } from 'react';
import { Github, Linkedin, Download } from 'lucide-react';

export default function HeroBadge() {
  const badgeRef = useRef(null);
  const wrapperRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    setDragging(true);
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  }, [offset]);

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    setOffset({ x: newX, y: newY });
  }, [dragging, dragStart]);

  const handlePointerUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    // Spring back to origin
    setOffset({ x: 0, y: 0 });
  }, [dragging]);

  useEffect(() => {
    // Attach global listeners for move/up so dragging works outside the badge
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Compute a slight rotation based on horizontal offset for realism
  const rotateZ = Math.max(-15, Math.min(15, offset.x * 0.12));
  
  // Compute lace stretch: increases height as badge moves down
  const laceStretch = Math.max(1, 1 + (offset.y * 0.003));

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
        <div 
          className="lanyard-wrapper" 
          ref={wrapperRef}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div
            className="lanyard-lace"
            style={{
              transform: `rotate(${rotateZ * 0.3}deg) scaleY(${laceStretch})`,
              transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
          <div className="lanyard-ring" />
          <div className="lanyard-clip" />

          <div
            ref={badgeRef}
            className={`id-badge ${dragging ? 'is-dragging' : ''}`}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            style={{
              transform: `rotate(${rotateZ}deg)`,
              transition: dragging
                ? 'none'
                : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: dragging ? 'grabbing' : 'grab',
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
                <a href="https://github.com/Lukyshi" target="_blank" rel="noopener noreferrer" className="id-badge-link" title="GitHub"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/luiz-bangsoy-b3aa86359/" target="_blank" rel="noopener noreferrer" className="id-badge-link" title="LinkedIn"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Linkedin size={20} />
                </a>
              </div>

              <a href="/resume.pdf" download="Luiz_Bangsoy_Resume.pdf" className="btn btn-primary resume-btn"
                onMouseDown={(e) => e.stopPropagation()}
              >
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
