import { createContext, useContext, useState } from "react";
import resumeSchema from "./resumeSchema";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(resumeSchema);
  const [selectedTemplate, setSelectedTemplate] = useState("ats");

  return (
    <ResumeContext.Provider value={{ resume, setResume, selectedTemplate, setSelectedTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
