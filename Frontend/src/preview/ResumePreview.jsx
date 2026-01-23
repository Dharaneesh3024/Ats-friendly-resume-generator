import { useRef } from "react";
import html2pdf from "html2pdf.js";
import AtsTemplate from "../templates/atsTemplate";
import { useResume } from "../context/ResumeContext";

const ResumePreview = () => {
  const { resume } = useResume(); // ✅ SAFE
  const resumeRef = useRef();

  const downloadPDF = () => {
    const element = resumeRef.current;

    const options = {
      margin: 0.5,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <>
      <div ref={resumeRef}>
        <AtsTemplate resume={resume} />
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download Resume (PDF)
      </button>
    </>
  );
};

export default ResumePreview;
