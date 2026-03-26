import { useState } from "react";
import "./formLayout.css";

import HeaderForm from "./HeaderForm";
import SummaryForm from "./SummaryForm";
import SkillsForm from "./SkillsForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import ProjectsForm from "./ProjectsForm";

import FloatingAI from "../chatbot/FloatingAI";
import AtsChatbot from "../chatbot/AtsChatbot";

const ResumeForm = () => {
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleSuggest = (prompt) => {
    setAiPrompt(prompt);
    setShowAI(true);
  };

  return (
    <>
      <div className="form-panel">
        <div className="form-title">Resume Builder</div>

        <div className="section-card"><HeaderForm /></div>
        <div className="section-card"><SummaryForm /></div>
        <div className="section-card"><SkillsForm /></div>

        <div className="section-card">
          <ExperienceForm onSuggestAI={handleSuggest} />
        </div>

        <div className="section-card"><EducationForm /></div>

        <div className="section-card">
          <ProjectsForm onSuggestAI={handleSuggest} />
        </div>
      </div>

      {/* Floating button */}
      <FloatingAI onClick={() => { setAiPrompt(""); setShowAI(true); }} />

      {/* AI CHATBOT */}
     <AtsChatbot
  isOpen={showAI}
  onClose={() => { setShowAI(false); setAiPrompt(""); }}
  contextualPrompt={aiPrompt}
/>

    </>
  );
};

export default ResumeForm;
