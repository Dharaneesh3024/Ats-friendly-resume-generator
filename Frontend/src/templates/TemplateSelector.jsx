import { useResume } from "../context/ResumeContext";
import "./templates.css";

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  const templates = [
    { id: "ats", name: "Classic ATS", description: "Standard, industry-proven layout" },
    { id: "modern", name: "Modern", description: "Stylish 2-column layout" },
    { id: "minimalist", name: "Minimalist", description: "Clean and professional" }
  ];

  return (
    <div className="template-selector">
      <h3>Select a Template</h3>
      <div className="template-grid">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className={`template-card ${selectedTemplate === tpl.id ? "active" : ""}`}
            onClick={() => setSelectedTemplate(tpl.id)}
          >
            <div className="template-preview-box">
              <div className={`mini-preview ${tpl.id}-mini`}></div>
            </div>
            <div className="template-info">
              <h4>{tpl.name}</h4>
              <p>{tpl.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
