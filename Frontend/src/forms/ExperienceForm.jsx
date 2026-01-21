import { useResume } from "../context/ResumeContext";

const ExperienceForm = ({ onSuggestAI }) => {
  const { resume, setResume } = useResume();

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        { role: "", company: "", startDate: "", endDate: "", points: [""] }
      ]
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...resume.experience];
    updated[index][field] = value;
    setResume({ ...resume, experience: updated });
  };

  const updatePoint = (expIndex, pointIndex, value) => {
    const updated = [...resume.experience];
    updated[expIndex].points[pointIndex] = value;
    setResume({ ...resume, experience: updated });
  };

  const addPoint = (index) => {
    const updated = [...resume.experience];
    updated[index].points.push("");
    setResume({ ...resume, experience: updated });
  };

  return (
    <>
      <h3>Experience</h3>

      {resume.experience.map((exp, index) => (
        <div key={index} className="experience-card">
          <input
            className="input-field"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => updateExperience(index, "role", e.target.value)}
          />

          <input
            className="input-field"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
          />

          <input
            className="input-field"
            placeholder="Start Date"
            value={exp.startDate}
            onChange={(e) =>
              updateExperience(index, "startDate", e.target.value)
            }
          />

          <input
            className="input-field"
            placeholder="End Date"
            value={exp.endDate}
            onChange={(e) =>
              updateExperience(index, "endDate", e.target.value)
            }
          />

          <div className="points-container">
            {exp.points.map((pt, i) => (
              <input
                key={i}
                className="input-field"
                placeholder="Achievement / Responsibility"
                value={pt}
                onChange={(e) => updatePoint(index, i, e.target.value)}
              />
            ))}
          </div>

          <div className="button-group">
            <button
              type="button"
              className="add-point-btn"
              onClick={() => addPoint(index)}
            >
              + Add Point
            </button>

            {/* 🔥 ONLY OPEN CHATBOT */}
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

      <button className="add-experience-btn" onClick={addExperience}>
        + Add Experience
      </button>
    </>
  );
};

export default ExperienceForm;
