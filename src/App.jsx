import { useState, useEffect } from 'react';
import { ChevronUp, Menu, X } from 'lucide-react';
import HeroBadge from './components/HeroBadge';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import SkillsConcepts from './components/SkillsConcepts';
import Experience from './components/Experience';
import GithubSection from './components/GithubSection';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

export default function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll listener for Back-to-Top visibility and navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show scroll-to-top button after scrolling down 400px
      if (currentScrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    setMenuActive(false);
  };

  return (
    <div className="app-container">
      {/* Top Navbar — simplified to 6 items */}
      <nav className={`navbar ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="navbar-container">
          <div className="logo-container">
            <span className="logo-slash">&lt;</span>
            luiz.b
            <span className="logo-dot">/&gt;</span>
          </div>

          <button
            className="nav-toggle"
            onClick={() => setMenuActive(!menuActive)}
            aria-label="Toggle Navigation Menu"
          >
            {menuActive ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
            <li>
              <a href="#about" className="nav-link" onClick={handleLinkClick}>
                About
              </a>
            </li>
            <li>
              <a href="#tech" className="nav-link" onClick={handleLinkClick}>
                Stack
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link" onClick={handleLinkClick}>
                Work
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link" onClick={handleLinkClick}>
                Skills
              </a>
            </li>
            <li>
              <a href="#experience" className="nav-link" onClick={handleLinkClick}>
                Timeline
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={handleLinkClick}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Body Sections */}
      <main className="main-content">
        <HeroBadge />
        <About />
        <TechStack />
        <Projects />
        <SkillsConcepts />
        <Experience />
        <GithubSection />
        <Certifications />
        <Contact />
      </main>

      {/* Back to Top Trigger */}
      <button
        className={`back-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        <ChevronUp size={24} />
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>
            Luiz Bangsoy | Backend Developer Portfolio
          </p>
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Luiz Bangsoy. Built using React and Custom CSS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
