import ResumeForm from "./forms/ResumeForm";
import ResumePreview from "./preview/ResumePreview";
import "./forms/formLayout.css";

function App() {
  return (
    <div className="builder-container">
      <ResumeForm />
      <div className="preview-panel">
        <h2>Live ATS Preview</h2>
        <ResumePreview />
      </div>
    </div>
  );
}

export default App;
