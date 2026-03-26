import { useRef } from "react";
import html2pdf from "html2pdf.js";
import AtsTemplate from "../templates/atsTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalistTemplate from "../templates/MinimalistTemplate";
import { useResume } from "../context/ResumeContext";

const ResumePreview = () => {
  const { resume, selectedTemplate } = useResume();
  const resumeRef = useRef();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate resume={resume} />;
      case "minimalist":
        return <MinimalistTemplate resume={resume} />;
      case "ats":
      default:
        return <AtsTemplate resume={resume} />;
    }
  };

  const downloadPDF = () => {
    const element = resumeRef.current;
    const options = {
      margin: 0.5,
      filename: `${resume.header.fullName || "Resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="preview-container">
      <div className="resume-paper" ref={resumeRef}>
        {renderTemplate()}
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default ResumePreview;
