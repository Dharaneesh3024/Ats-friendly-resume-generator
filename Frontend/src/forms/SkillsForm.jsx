import { useResume } from "../context/ResumeContext";

const SkillsForm = () => {
  const { resume, setResume } = useResume();

  const handleSkillChange = (category, value) => {
    setResume({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: value.split(",").map(s => s.trim())
      }
    });
  };

  return (
    <div>
      <h3>Skills</h3>

      <input
        placeholder="Languages (comma separated)"
        onChange={(e) => handleSkillChange("languages", e.target.value)}
      />

      <input
        placeholder="Frameworks (comma separated)"
        onChange={(e) => handleSkillChange("frameworks", e.target.value)}
      />

      <input
        placeholder="Tools (comma separated)"
        onChange={(e) => handleSkillChange("tools", e.target.value)}
      />
    </div>
  );
};

export default SkillsForm;
