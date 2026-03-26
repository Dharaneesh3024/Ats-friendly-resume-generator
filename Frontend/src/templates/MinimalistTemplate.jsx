import "./templates.css";

const MinimalistTemplate = ({ resume }) => {
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
    <div className="minimalist-resume">
      <div className="min-header">
        <h1>{header.fullName || "Your Name"}</h1>
        <p className="min-tagline">
          {header.email} • {header.phone} • {header.location} • {header.linkedin}
        </p>
      </div>

      {summary && (
        <section className="min-section">
          <p className="min-summary">{summary}</p>
        </section>
      )}

      <section className="min-section">
        <h2 className="min-title">Technical Expertise</h2>
        <div className="min-skills">
          <p><strong>Languages:</strong> {skills.languages.join(", ")}</p>
          <p><strong>Frameworks:</strong> {skills.frameworks.join(", ")}</p>
          <p><strong>Tools:</strong> {skills.tools.join(", ")}</p>
        </div>
      </section>

      {experience.length > 0 && (
        <section className="min-section">
          <h2 className="min-title">Involvement</h2>
          {experience.map((exp, index) => (
            <div key={index} className="min-item">
              <div className="min-item-row">
                <span className="min-role">{exp.role}</span>
                <span className="min-dates">{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="min-company">{exp.company}</div>
              <ul className="min-list">
                {exp.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="min-section">
          <h2 className="min-title">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="min-item">
              <div className="min-item-row">
                <span className="min-inst">{edu.institution}</span>
                <span className="min-dates">{edu.startYear} – {edu.endYear} {edu.gpa && `| GPA: ${edu.gpa}`}</span>
              </div>
              <div className="min-degree">{edu.degree}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default MinimalistTemplate;
