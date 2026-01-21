import { useResume } from "../context/ResumeContext";

const EducationForm = () => {
  const { resume, setResume } = useResume();

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        { degree: "", institution: "", startYear: "", endYear: "" }
      ]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...resume.education];
    updated[index][field] = value;
    setResume({ ...resume, education: updated });
  };

  return (
    <>
      <h3>Education</h3>

      {resume.education.map((edu, index) => (
        <div key={index} className="education-card">
          <input
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => updateEducation(index, "degree", e.target.value)}
          />
          <input
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) =>
              updateEducation(index, "institution", e.target.value)
            }
          />
          <input
            placeholder="Start Year"
            value={edu.startYear}
            onChange={(e) =>
              updateEducation(index, "startYear", e.target.value)
            }
          />
          <input
            placeholder="End Year"
            value={edu.endYear}
            onChange={(e) =>
              updateEducation(index, "endYear", e.target.value)
            }
          />
        </div>
      ))}

      <button className="add-education-btn" onClick={addEducation}>
        + Add Education
      </button>
    </>
  );
};

export default EducationForm;
