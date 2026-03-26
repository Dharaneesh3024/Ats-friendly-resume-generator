import "./templates.css";

const ModernTemplate = ({ resume }) => {
  if (!resume) return null;

  const {
    header,
    summary,
    skills,
    experience,
    projects,
    education,
    certifications
  } = resume;

  return (
    <div className="modern-resume">
      <header className="modern-header">
        <h1>{header.fullName || "Your Name"}</h1>
        <div className="contact-info">
          <span>{header.email}</span>
          <span>{header.phone}</span>
          <span>{header.location}</span>
          <span>{header.linkedin}</span>
          <span>{header.github}</span>
        </div>
      </header>

      <div className="modern-grid">
        <aside className="modern-sidebar">
          {summary && (
            <section className="modern-section">
              <h3>About Me</h3>
              <p>{summary}</p>
            </section>
          )}

          <section className="modern-section">
            <h3>Skills</h3>
            <div className="skill-group">
              <h4>Languages</h4>
              <p>{skills.languages.join(", ")}</p>
            </div>
            <div className="skill-group">
              <h4>Frameworks</h4>
              <p>{skills.frameworks.join(", ")}</p>
            </div>
          </section>

          {education.length > 0 && (
            <section className="modern-section">
              <h3>Education</h3>
              {education.map((edu, index) => (
                <div key={index} className="edu-item">
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-inst">{edu.institution}</p>
                  <p className="edu-year">{edu.startYear} - {edu.endYear} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </section>
          )}
        </aside>

        <main className="modern-main">
          {experience.length > 0 && (
            <section className="modern-section">
              <h2>Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="modern-item">
                  <div className="item-header">
                    <span className="role">{exp.role}</span>
                    <span className="dates">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="company">{exp.company}</div>
                  <ul className="points">
                    {exp.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section className="modern-section">
              <h2>Projects</h2>
              {projects.map((proj, index) => (
                <div key={index} className="modern-item">
                  <div className="item-header">
                    <span className="role">{proj.title}</span>
                    {proj.link && <a href={proj.link} className="proj-link">Link</a>}
                  </div>
                  <p className="tech">Technologies: {proj.technologies.join(", ")}</p>
                  <ul className="points">
                    {proj.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ModernTemplate;
