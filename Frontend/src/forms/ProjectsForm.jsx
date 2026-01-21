import { useResume } from "../context/ResumeContext";
import "./formLayout.css"

const ProjectsForm = ({ onSuggestAI }) => {
  const { resume, setResume } = useResume();

  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        { title: "", description: "", technologies: [], points: [""] }
      ]
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...resume.projects];
    if (field === "technologies") {
      updated[index][field] = value.split(",").map(t => t.trim());
    } else {
      updated[index][field] = value;
    }
    setResume({ ...resume, projects: updated });
  };

  const updatePoint = (projIndex, pointIndex, value) => {
    const updated = [...resume.projects];
    updated[projIndex].points[pointIndex] = value;
    setResume({ ...resume, projects: updated });
  };

  const addPoint = (index) => {
    const updated = [...resume.projects];
    updated[index].points.push("");
    setResume({ ...resume, projects: updated });
  };

  return (
    <>
      <h3>Projects</h3>

      {resume.projects.map((proj, index) => (
        <div key={index} className="project-card">
          <input
            className="input-field"
            placeholder="Project Title"
            value={proj.title}
            onChange={(e) => updateProject(index, "title", e.target.value)}
          />

          <textarea
            className="input-field"
            placeholder="Project Description"
            value={proj.description}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
          />

          <input
            className="input-field"
            placeholder="Technologies (comma separated)"
            value={proj.technologies.join(", ")}
            onChange={(e) =>
              updateProject(index, "technologies", e.target.value)
            }
          />

          <div className="points-container">
            {proj.points.map((pt, i) => (
              <input
                key={i}
                className="input-field"
                placeholder="Achievement / Feature"
                value={pt}
                onChange={(e) => updatePoint(index, i, e.target.value)}
              />
            ))}
          </div>

          {/* 🔥 BUTTON GROUP */}
          <div className="button-group">
            <button
              type="button"
              className="add-point-btn"
              onClick={() => addPoint(index)}
            >
              + Add Point
            </button>

            <button
              type="button"
              className="ai-suggest-btn"
              onClick={onSuggestAI}
            >
              Suggest Bullets
            </button>
          </div>
        </div>
      ))}

      <button className="add-project-btn" onClick={addProject}>
        + Add Project
      </button>
    </>
  );
};

export default ProjectsForm;
