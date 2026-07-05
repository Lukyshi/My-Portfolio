import { useState, useRef, useEffect, useCallback } from 'react';
import { Github, Linkedin, Download, QrCode } from 'lucide-react';

// QR code data URLs for different social links
const QR_CODES = {
  github: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com/Lukyshi',
  linkedin: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.linkedin.com/in/luiz-bangsoy-b3aa86359/',
};

export default function HeroBadge() {
  const badgeRef = useRef(null);
  const wrapperRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQRIndex, setCurrentQRIndex] = useState(0);
  const qrCodes = [QR_CODES.github, QR_CODES.linkedin];

  const handlePointerDown = useCallback((e) => {
    if (e.target.closest('.id-badge-flip-btn')) {
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    setDragging(true);
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  }, [offset]);

  const handleBadgeClick = useCallback((e) => {
    if (!dragging && !e.target.closest('a')) {
      setIsFlipped(!isFlipped);
    }
  }, [dragging, isFlipped]);

  const handleFlipQR = useCallback((e) => {
    e.stopPropagation();
    setCurrentQRIndex((prev) => (prev + 1) % qrCodes.length);
  }, [qrCodes.length]);

const handlePointerMove = useCallback((e) => {
  if (!dragging) return;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const newY = clientY - dragStart.y;
  // Only allow downward movement, clamp to 0 minimum (can't pull up past start)
  const clampedY = Math.max(0, newY);
  setOffset({ x: 0, y: clampedY });  // x is always 0 now
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

  // Calculate lace properties for dual stretching laces
  // Laces start at fixed points (-30, 0) and (+30, 0) relative to anchor center
  // Badge attachment is at (offset.x ± 30, offset.y + 90)
  // So relative displacement is (offset.x, offset.y + 90) for both laces
  const INITIAL_LACE_LENGTH = 90;
  const LACE_ATTACHMENT_OFFSET = 30; // Half-width of badge top where laces attach
  
  // Calculate relative displacement from each lace's starting point to attachment
  const relativeX = offset.x;
  const relativeY = offset.y + INITIAL_LACE_LENGTH;
  
  // Both laces use the same angle and length since they start at symmetrical points
  const laceLength = Math.sqrt(relativeX ** 2 + relativeY ** 2);
  const laceAngle = Math.atan2(relativeX, relativeY) * (180 / Math.PI);
  
  // Compute rotation based on horizontal offset for realism
  const rotateZ = Math.max(-15, Math.min(15, offset.x * 0.12));

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
        >
          {/* Laces attach directly to navbar below this point */}
          
          
          {/* Single Lanyard Lace */}
        <div className="lanyard-lace"
  style={{
    height: `${INITIAL_LACE_LENGTH + offset.y}px`,
    transition: dragging ? 'none' : 'height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }}
/>

          {/* Badge - moves with drag offset */}
          <div
            ref={badgeRef}
            className={`id-badge-container ${dragging ? 'is-dragging' : ''}`}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Badge with flip animation */}
            <div
              className={`id-badge ${dragging ? 'is-dragging' : ''}`}
              onMouseDown={handlePointerDown}
              onTouchStart={handlePointerDown}
              onClick={handleBadgeClick}
              style={{
                transform: `rotate(${isFlipped ? 0 : rotateZ}deg) rotateY(${isFlipped ? 180 : 0}deg)`,
                transition: dragging ? 'none' : isFlipped ? 'transform 0.6s ease-out' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: dragging ? 'grabbing' : 'pointer',
              }}
            >
              {/* Front of badge */}
              <div className="id-badge-front">
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
                  <div className="id-badge-title">Junior Backend Developer</div>
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

              {/* Back of badge - QR Code */}
              <div className="id-badge-back">
                <div className="qr-code-container">
                  <img 
                    src={qrCodes[currentQRIndex]} 
                    alt="QR Code to GitHub/LinkedIn" 
                    className="qr-code-image"
                  />
                  <button 
                    className="id-badge-flip-btn"
                    onClick={handleFlipQR}
                    title="Switch to next QR code"
                  >
                    <QrCode size={16} /> Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
