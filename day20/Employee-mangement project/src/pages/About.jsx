import './About.css'

const About = () => {
  const team = [
    { name: 'Rajesh Verma', role: 'Founder & CEO', bio: 'Visionary leader with 15+ years in HR technology', avatar: 'RV', color: 'primary' },
    { name: 'Sneha Iyer', role: 'CTO', bio: 'Tech architect passionate about scalable solutions', avatar: 'SI', color: 'accent' },
    { name: 'Mark Thompson', role: 'Head of Design', bio: 'Design thinker crafting beautiful user experiences', avatar: 'MT', color: 'cool' },
    { name: 'Deepa Nair', role: 'VP of Operations', bio: 'Operations expert driving seamless workflows', avatar: 'DN', color: 'warm' },
  ]

  const values = [
    { icon: '💡', title: 'Innovation', desc: 'Constantly pushing boundaries to deliver cutting-edge HR solutions that make a real difference.' },
    { icon: '🤝', title: 'Collaboration', desc: 'Building bridges between teams and fostering a culture of open communication and teamwork.' },
    { icon: '🎯', title: 'Excellence', desc: 'Committed to the highest standards of quality in every feature we build and every service we offer.' },
    { icon: '❤️', title: 'People First', desc: 'Everything we create is designed with people at the center, because great tools empower great teams.' },
  ]

  const milestones = [
    { year: '2020', title: 'Founded', desc: 'TECH EMS was born with a mission to revolutionize employee management.' },
    { year: '2021', title: 'First 100 Clients', desc: 'Reached our first milestone of 100 enterprise clients across 5 countries.' },
    { year: '2022', title: 'Series A Funding', desc: 'Raised $10M to accelerate product development and global expansion.' },
    { year: '2023', title: 'AI Integration', desc: 'Launched AI-powered analytics and predictive HR insights.' },
    { year: '2024', title: 'Global Expansion', desc: 'Expanded to 32 countries with 2,500+ active organizations.' },
    { year: '2025', title: 'Award Winning', desc: 'Named "Best HR Tech Platform" by TechReview Magazine.' },
  ]

  return (
    <div className="about-page" id="about-page">
      {/* Hero */}
      <section className="about-hero" id="about-hero">
        <div className="about-hero-bg">
          <div className="ah-blob ab-1"></div>
          <div className="ah-blob ab-2"></div>
        </div>
        <div className="about-hero-content">
          <span className="section-badge accent animate-fadeInUp delay-1">💡 About Us</span>
          <h1 className="about-hero-title animate-fadeInUp delay-2">
            We're Building the Future of <span className="highlight">HR Technology</span>
          </h1>
          <p className="about-hero-subtitle animate-fadeInUp delay-3">
            TECH EMS is a modern employee management platform designed to help
            organizations streamline their HR operations, boost employee
            engagement, and make data-driven people decisions.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section about-mission" id="about-mission">
        <div className="mission-grid">
          <div className="mission-card animate-fadeInLeft delay-1" id="mission-card">
            <div className="mission-icon-wrap">🎯</div>
            <h3 className="mission-title">Our Mission</h3>
            <p className="mission-desc">
              To empower every organization with intuitive, intelligent HR tools
              that simplify workforce management and unlock the full potential of
              their teams.
            </p>
          </div>
          <div className="mission-card animate-fadeInRight delay-2" id="vision-card">
            <div className="mission-icon-wrap">🔭</div>
            <h3 className="mission-title">Our Vision</h3>
            <p className="mission-desc">
              A world where every company, regardless of size, has access to
              enterprise-grade HR technology that puts people at the heart of
              business success.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values" id="about-values">
        <div className="section-header">
          <span className="section-badge primary animate-fadeInUp delay-1">✨ Values</span>
          <h2 className="section-title animate-fadeInUp delay-2">
            What <span className="highlight">Drives</span> Us
          </h2>
          <p className="section-subtitle animate-fadeInUp delay-3">
            Our core values guide every decision we make and every feature we build
          </p>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className={`value-card animate-fadeInUp delay-${i + 1}`} id={`value-card-${i}`}>
              <div className="value-icon">{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section about-timeline" id="about-timeline">
        <div className="section-header">
          <span className="section-badge info animate-fadeInUp delay-1">🚀 Journey</span>
          <h2 className="section-title animate-fadeInUp delay-2">
            Our <span className="highlight-accent">Story</span>
          </h2>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} animate-fadeInUp delay-${(i % 3) + 1}`} id={`milestone-${i}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-year">{m.year}</span>
                <h4 className="timeline-title">{m.title}</h4>
                <p className="timeline-desc">{m.desc}</p>
              </div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team" id="about-team">
        <div className="section-header">
          <span className="section-badge accent animate-fadeInUp delay-1">👥 Team</span>
          <h2 className="section-title animate-fadeInUp delay-2">
            Meet the <span className="highlight">People</span> Behind TECH EMS
          </h2>
          <p className="section-subtitle animate-fadeInUp delay-3">
            Our diverse team of passionate professionals working to make HR better
          </p>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className={`team-card animate-fadeInUp delay-${i + 1}`} id={`team-card-${i}`}>
              <div className={`team-avatar emp-avatar-${member.color}`}>
                {member.avatar}
              </div>
              <h3 className="team-name">{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p className="team-bio">{member.bio}</p>
              <div className="team-socials">
                <button className="team-social-btn">🐦</button>
                <button className="team-social-btn">💼</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
