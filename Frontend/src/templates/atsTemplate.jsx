import "./ats.css";

const AtsTemplate = ({ resume }) => {
  if (!resume) return null; // ⛑ prevents crash

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
    <div className="resume">

      {/* HEADER */}
      <div className="resume-section header">
        <h1>{header.fullName || "Your Name"}</h1>
        <p className="header-line">
          {header.email && `${header.email} | `}
          {header.phone && `${header.phone} | `}
          {header.linkedin && `${header.linkedin} | `}
          {header.github}
        </p>
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="resume-section">
          <h2>Professional Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {/* SKILLS */}
      <div className="resume-section">
        <h2>Skills</h2>
        <p><strong>Languages:</strong> {skills.languages.join(", ")}</p>
        <p><strong>Frameworks:</strong> {skills.frameworks.join(", ")}</p>
        <p><strong>Tools:</strong> {skills.tools.join(", ")}</p>
      </div>

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div className="resume-section">
          <h2>Experience</h2>

          {experience.map((exp, index) => (
            <div key={index} className="item">
              <p className="item-title">
                <strong>{exp.role}</strong>, {exp.company}
              </p>
              <p className="item-subtitle">
                {exp.startDate} – {exp.endDate}
              </p>
              <ul>
                {exp.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <div className="resume-section">
          <h2>Projects</h2>

          {projects.map((proj, index) => (
            <div key={index} className="item">
              <p className="item-title">
                <strong>{proj.title}</strong>
              </p>
              <p>{proj.description}</p>
              <p>
                <strong>Technologies:</strong>{" "}
                {proj.technologies.join(", ")}
              </p>
              <ul>
                {proj.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div className="resume-section">
          <h2>Education</h2>

          {education.map((edu, index) => (
            <div key={index} className="item">
              <p className="item-title">
                <strong>{edu.degree}</strong>, {edu.institution}
              </p>
              <p className="item-subtitle">
                {edu.startYear} – {edu.endYear}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <div className="resume-section">
          <h2>Certifications</h2>
          <ul>
            {certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default AtsTemplate;
