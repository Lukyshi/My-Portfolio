import { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'All form fields are required.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('https://formspree.io/f/bangsoyjohnluiz14@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to send message. Please try again or email directly.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'A network error occurred. Please try again or email directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="glass-panel">
      <h2 className="section-title">
        <Mail size={28} className="logo-dot" /> Contact Me
      </h2>
      <p className="section-subtitle">&gt; ping -c 1 bangsoyjohnluiz14@gmail.com</p>

      <div className="contact-container">
        {/* Contact Form */}
        <div className="glass-panel contact-form-panel">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Write your backend collaboration proposal..."
                required
              />
            </div>

            {status.type && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.9rem',
                color: status.type === 'success' ? 'var(--accent-green)' : '#ef4444',
                padding: '10px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${status.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
              }}>
                {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ justifyContent: 'center', marginTop: 10 }}
              disabled={loading}
            >
              <Send size={16} />
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-info-panel">
          <div>
            <h3 className="contact-info-title">Let's Connect</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Feel free to reach out for internship opportunities, project collaborations, or queries regarding my backend API services.
            </p>
          </div>

          <div className="contact-info-list">
            {/* Email Card */}
            <div className="contact-info-item">
              <div className="contact-info-icon-wrapper">
                <Mail size={20} />
              </div>
              <div className="contact-info-details">
                <h4>EMAIL</h4>
                <a href="mailto:bangsoyjohnluiz14@gmail.com">
                  bangsoyjohnluiz14@gmail.com
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="contact-info-item">
              <div className="contact-info-icon-wrapper">
                <Github size={20} />
              </div>
              <div className="contact-info-details">
                <h4>GITHUB</h4>
                <a href="https://github.com/Lukyshi" target="_blank" rel="noopener noreferrer">
                  github.com/Lukyshi
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="contact-info-item">
              <div className="contact-info-icon-wrapper">
                <Linkedin size={20} />
              </div>
              <div className="contact-info-details">
                <h4>LINKEDIN</h4>
                <a href="https://www.linkedin.com/in/luiz-bangsoy-b3aa86359/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/luiz-bangsoy-b3aa86359/
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
