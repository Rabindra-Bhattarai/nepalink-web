"use client";

import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --sky: #0EA5E9;
    --sky-light: #38BDF8;
    --sky-pale: #E0F2FE;
    --red: #E11D48;
    --white: #FFFFFF;
    --off-white: #F8FAFC;
    --gray: #64748B;
    --dark: #0F172A;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--dark); overflow-x: hidden; }
  .display-font { font-family: 'Playfair Display', serif; }

  .nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid #E0F2FE; padding: 0 5%; }
  .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 70px; }
  .logo { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 900; color: var(--sky); letter-spacing: -0.5px; }
  .logo span { color: var(--red); }
  .nav-links { display: flex; align-items: center; gap: 2rem; }
  .nav-links a { text-decoration: none; color: var(--dark); font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
  .nav-links a:hover { color: var(--sky); }
  .btn-login { background: var(--sky) !important; color: white !important; padding: 0.55rem 1.4rem; border-radius: 50px; font-weight: 600 !important; font-size: 0.88rem; box-shadow: 0 4px 14px rgba(14,165,233,0.35); transition: background 0.2s, transform 0.2s !important; }
  .btn-login:hover { background: var(--sky-light) !important; transform: translateY(-1px); }

  .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; background: var(--white); }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 70% 50%, #E0F2FE 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 80%, #FFF1F2 0%, transparent 50%); }
  .hero-grid { position: absolute; inset: 0; opacity: 0.06; background-image: linear-gradient(var(--sky) 1px, transparent 1px), linear-gradient(90deg, var(--sky) 1px, transparent 1px); background-size: 60px 60px; }
  .hero-inner { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; padding: 0 5%; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  
  .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: #FFF1F2; color: var(--red); padding: 0.35rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 1.5rem; border: 1px solid #FECDD3; animation: fadeDown 0.6s ease both; }
  .badge-dot { width: 7px; height: 7px; background: var(--red); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fillBar { from{width:0} to{width:92%} }

  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 5vw, 4.2rem); font-weight: 900; line-height: 1.1; color: var(--dark); animation: fadeUp 0.7s 0.1s ease both; }
  .hero-title .accent { color: var(--sky); }
  .hero-title .accent-red { color: var(--red); }
  .hero-subtitle { margin-top: 1.2rem; font-size: 1.05rem; color: var(--gray); line-height: 1.7; max-width: 460px; animation: fadeUp 0.7s 0.2s ease both; }
  .hero-btns { margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap; animation: fadeUp 0.7s 0.3s ease both; }
  
  .btn-primary { background: linear-gradient(135deg, var(--sky), var(--sky-light)); color: white; padding: 0.9rem 2.2rem; border-radius: 50px; font-weight: 600; font-size: 1rem; text-decoration: none; box-shadow: 0 8px 24px rgba(14,165,233,0.35); transition: transform 0.2s, box-shadow 0.2s; display: inline-block; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(14,165,233,0.45); }
  .btn-outline { background: white; color: var(--dark); padding: 0.9rem 2.2rem; border-radius: 50px; font-weight: 600; font-size: 1rem; text-decoration: none; border: 2px solid #E2E8F0; transition: border-color 0.2s, color 0.2s, transform 0.2s; display: inline-block; }
  .btn-outline:hover { border-color: var(--sky); color: var(--sky); transform: translateY(-2px); }

  .hero-stats { display: flex; gap: 2.5rem; margin-top: 2.5rem; animation: fadeUp 0.7s 0.4s ease both; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 900; color: var(--dark); }
  .stat-num span { color: var(--sky); }
  .stat-label { font-size: 0.78rem; color: var(--gray); font-weight: 500; }

  .hero-visual { position: relative; animation: fadeRight 0.8s 0.2s ease both; }
  .care-card { background: white; border-radius: 24px; padding: 2rem; box-shadow: 0 20px 60px rgba(14,165,233,0.12), 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #E0F2FE; }
  .care-card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
  .avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--sky), var(--sky-light)); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.3rem; font-weight: 700; }
  .caregiver-name { font-weight: 600; font-size: 1rem; }
  .caregiver-role { font-size: 0.8rem; color: var(--gray); }
  .verified-badge { margin-left: auto; background: #ECFDF5; color: #059669; padding: 0.25rem 0.7rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; }
  .card-stats-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem; margin-bottom: 1.5rem; }
  .mini-stat { background: var(--off-white); border-radius: 12px; padding: 0.75rem; text-align: center; }
  .mini-stat-val { font-weight: 700; font-size: 1.1rem; color: var(--dark); }
  .mini-stat-lbl { font-size: 0.72rem; color: var(--gray); margin-top: 2px; }
  .card-progress-label { display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--gray); margin-bottom: 0.4rem; }
  .progress-bar { background: #E2E8F0; border-radius: 50px; height: 7px; }
  .progress-fill { background: linear-gradient(90deg, var(--sky), var(--sky-light)); border-radius: 50px; height: 100%; width: 92%; animation: fillBar 1.5s 1s ease both; }
  .float-chip { position: absolute; background: white; border-radius: 14px; padding: 0.6rem 1rem; box-shadow: 0 8px 24px rgba(0,0,0,0.1); font-size: 0.78rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; }
  .chip-top { top: -18px; right: 40px; color: var(--red); }
  .chip-bottom { bottom: -18px; left: 30px; color: var(--sky); }

  .features { background: var(--off-white); padding: 6rem 5%; }
  .section-label { display: inline-block; background: #E0F2FE; color: var(--sky); padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 1rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900; color: var(--dark); margin-bottom: 0.75rem; }
  .section-sub { color: var(--gray); font-size: 1rem; max-width: 500px; margin: 0 auto; line-height: 1.7; }
  .section-head { text-align: center; margin-bottom: 3.5rem; }

  .features-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
  .feature-card { background: white; border-radius: 20px; padding: 2rem; border: 1.5px solid #E0F2FE; transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s; }
  .feature-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(14,165,233,0.12); border-color: var(--sky-light); }
  .feature-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 1.2rem; }
  .icon-sky { background: #E0F2FE; }
  .icon-red { background: #FFF1F2; }
  .icon-green { background: #ECFDF5; }
  .feature-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--dark); margin-bottom: 0.6rem; }
  .feature-desc { font-size: 0.9rem; color: var(--gray); line-height: 1.7; }

  .how { background: white; padding: 6rem 5%; }
  .steps { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; position: relative; }
  .steps::before { content:''; position: absolute; top: 28px; left: calc(16.67% + 16px); right: calc(16.67% + 16px); height: 2px; background: linear-gradient(90deg, var(--sky), var(--sky-light)); }
  .step { text-align: center; }
  .step-num { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--sky), var(--sky-light)); color: white; font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 900; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.2rem; position: relative; z-index: 2; box-shadow: 0 6px 20px rgba(14,165,233,0.35); }
  .step-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem; }
  .step-desc { font-size: 0.87rem; color: var(--gray); line-height: 1.6; }

  .testimonials { background: linear-gradient(135deg, #0F172A 0%, #0C2340 100%); padding: 6rem 5%; position: relative; overflow: hidden; }
  .testimonials::before { content:''; position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%); top: -200px; right: -100px; }
  .testimonials .section-label { background: rgba(14,165,233,0.15); color: #38BDF8; }
  .testimonials .section-title { color: white; }
  .testimonials-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .testimonial-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2rem; transition: background 0.25s, transform 0.25s; }
  .testimonial-card:hover { background: rgba(14,165,233,0.08); transform: translateY(-4px); }
  .quote-mark { font-family: 'Playfair Display', serif; font-size: 3.5rem; line-height: 1; color: var(--sky); opacity: 0.5; margin-bottom: 0.5rem; }
  .quote-text { color: #CBD5E1; font-size: 1rem; line-height: 1.7; font-style: italic; }
  .quote-author { margin-top: 1.5rem; display: flex; align-items: center; gap: 0.75rem; }
  .author-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--sky), var(--sky-light)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.9rem; }
  .author-name { color: white; font-weight: 600; font-size: 0.9rem; }
  .author-role { color: #64748B; font-size: 0.78rem; }

  .cta { background: linear-gradient(135deg, var(--sky) 0%, #0284C7 100%); padding: 5rem 5%; text-align: center; position: relative; overflow: hidden; }
  .cta::before { content:''; position: absolute; width: 400px; height: 400px; border-radius: 50%; background: rgba(255,255,255,0.07); bottom: -150px; left: -100px; }
  .cta::after { content:''; position: absolute; width: 300px; height: 300px; border-radius: 50%; background: rgba(225,29,72,0.15); top: -80px; right: -80px; }
  .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900; color: white; margin-bottom: 1rem; position: relative; z-index: 2; }
  .cta-sub { color: rgba(255,255,255,0.8); font-size: 1rem; margin-bottom: 2rem; position: relative; z-index: 2; }
  .btn-white { background: white; color: var(--sky); padding: 0.9rem 2.5rem; border-radius: 50px; font-weight: 700; font-size: 1rem; text-decoration: none; box-shadow: 0 8px 24px rgba(0,0,0,0.15); transition: transform 0.2s, box-shadow 0.2s; display: inline-block; position: relative; z-index: 2; }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
  .btn-red-outline { background: transparent; color: white; padding: 0.9rem 2.5rem; border-radius: 50px; font-weight: 600; font-size: 1rem; text-decoration: none; border: 2px solid rgba(255,255,255,0.5); transition: border-color 0.2s, transform 0.2s; display: inline-block; position: relative; z-index: 2; margin-left: 1rem; }
  .btn-red-outline:hover { border-color: white; transform: translateY(-2px); }

  .footer { background: var(--dark); padding: 3rem 5%; text-align: center; color: #64748B; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 900; color: #38BDF8; margin-bottom: 1.2rem; }
  .footer-logo span { color: var(--red); }
  .footer-links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1.5rem; }
  .footer-links a { color: #64748B; text-decoration: none; font-size: 0.87rem; transition: color 0.2s; }
  .footer-links a:hover { color: #38BDF8; }
  .footer-divider { height: 1px; background: #1E293B; margin-bottom: 1.5rem; }
  .footer-copy { font-size: 0.82rem; }

  @media (max-width: 768px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-visual { display: none; }
    .features-grid, .steps, .testimonials-grid { grid-template-columns: 1fr; }
    .steps::before { display: none; }
    .btn-red-outline { margin-left: 0; margin-top: 0.75rem; display: block; width: fit-content; margin: 0.75rem auto 0; }
  }
`;

interface FeatureCardProps {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, iconClass, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className={"feature-icon " + iconClass}>{icon}</div>
      <div className="feature-title">{title}</div>
      <div className="feature-desc">{description}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <main>
        <nav className="nav">
          <div className="nav-inner">
            <div className="logo">Nepa<span>Link</span></div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="/login" className="btn-login">Login</a>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div className="hero-inner">
            <div>
              <div className="hero-badge">
                <div className="badge-dot" />
                Trusted Healthcare Bridge
              </div>
              <h2 className="hero-title">
                Care That Feels<br />
                <span className="accent">Truly</span> <span className="accent-red">Connected</span>
              </h2>
              <p className="hero-subtitle">
                A secure digital bridge between families and verified caregivers — bringing peace of mind, transparency, and compassionate care together.
              </p>
              <div className="hero-btns">
                <a href="/register" className="btn-primary">Get Started →</a>
                <a href="#features" className="btn-outline">Explore Features</a>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-num">2k<span>+</span></div>
                  <div className="stat-label">Verified Caregivers</div>
                </div>
                <div className="stat">
                  <div className="stat-num">98<span>%</span></div>
                  <div className="stat-label">Family Satisfaction</div>
                </div>
                <div className="stat">
                  <div className="stat-num">24<span>/7</span></div>
                  <div className="stat-label">Support Available</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="float-chip chip-top">
                <span>❤️</span> Match Found!
              </div>
              <div className="care-card">
                <div className="care-card-header">
                  <div className="avatar">S</div>
                  <div>
                    <div className="caregiver-name">Sunita Sharma</div>
                    <div className="caregiver-role">Senior Care Specialist</div>
                  </div>
                  <div className="verified-badge">✓ Verified</div>
                </div>
                <div className="card-stats-row">
                  <div className="mini-stat">
                    <div className="mini-stat-val">4.9</div>
                    <div className="mini-stat-lbl">Rating</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-val">6yr</div>
                    <div className="mini-stat-lbl">Experience</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-val">48</div>
                    <div className="mini-stat-lbl">Families</div>
                  </div>
                </div>
                <div className="card-progress-label">
                  <span>Profile Match</span><span>92%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" />
                </div>
              </div>
              <div className="float-chip chip-bottom">
                <span>🔒</span> Encrypted & Secure
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="section-head">
            <div className="section-label">WHY NEPALINK</div>
            <h3 className="section-title">Built for Trust & Care</h3>
            <p className="section-sub">Designed for long-term care relationships with security, transparency, and compassion at the core.</p>
          </div>
          <div className="features-grid">
            <FeatureCard icon="🎯" iconClass="icon-sky" title="Smart Matching" description="Data-driven caregiver selection tailored precisely to your family's unique needs, preferences, and care requirements." />
            <FeatureCard icon="🔐" iconClass="icon-red" title="Secure Communication" description="End-to-end encrypted messaging with transparent activity logs, giving families real-time peace of mind." />
            <FeatureCard icon="✅" iconClass="icon-green" title="Verified Profiles" description="Rigorous identity checks and background verifications ensure every caregiver meets our high accountability standards." />
          </div>
        </section>

        <section id="about" className="how">
          <div className="section-head">
            <div className="section-label">HOW IT WORKS</div>
            <h3 className="section-title">Simple. Safe. Seamless.</h3>
            <p className="section-sub">Get started in three easy steps and connect with the right caregiver for your family.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-title">Create Your Profile</div>
              <div className="step-desc">Tell us about your family's care needs, preferences, and schedule in just a few minutes.</div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-title">Get Matched</div>
              <div className="step-desc">Our smart algorithm connects you with verified caregivers who are the perfect fit.</div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-title">Stay Connected</div>
              <div className="step-desc">Communicate securely and track care progress in real time from anywhere in the world.</div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="section-head">
            <div className="section-label">TESTIMONIALS</div>
            <h3 className="section-title">Trusted by the Community</h3>
            <p className="section-sub" style={{color:'#94A3B8'}}>Families and caregivers across Nepal rely on NepaLink every day.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <div className="quote-text">NepaLink gave me complete peace of mind even while abroad. I could check updates on my parents anytime and trust that their caregiver was truly verified.</div>
              <div className="quote-author">
                <div className="author-avatar">R</div>
                <div>
                  <div className="author-name">Rajan Thapa</div>
                  <div className="author-role">Family Member, Overseas</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <div className="quote-text">Finally a platform that truly respects caregivers. The verified profile system helped me build trust with families quickly and professionally.</div>
              <div className="quote-author">
                <div className="author-avatar">S</div>
                <div>
                  <div className="author-name">Sita Adhikari</div>
                  <div className="author-role">Certified Caregiver</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <h3 className="cta-title">Ready to Make Care Truly Connected?</h3>
          <p className="cta-sub">Join thousands of families who trust NepaLink for compassionate, secure, and verified care.</p>
          <div>
            <a href="/register" className="btn-white">Get Started Free</a>
            <a href="#contact" className="btn-red-outline">Contact Us</a>
          </div>
        </section>

        <footer className="footer" id="contact">
          <div className="footer-logo">Nepa<span>Link</span></div>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-divider" />
          <div className="footer-copy">© {new Date().getFullYear()} NepaLink. All rights reserved.</div>
        </footer>
      </main>
    </>
  );
}