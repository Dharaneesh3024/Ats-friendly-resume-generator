import ResumeForm from "./forms/ResumeForm";
import ResumePreview from "./preview/ResumePreview";
import TemplateSelector from "./templates/TemplateSelector";
import "./forms/formLayout.css";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">📄</span>
          <h1>ATS Resume Builder</h1>
        </div>
        <p className="subtitle">Create professional, job-winning resumes in minutes.</p>
      </header>
      
      <main className="builder-main">
        <div className="left-panel">
          <TemplateSelector />
          <ResumeForm />
        </div>
        
        <div className="right-panel">
          <div className="preview-header">
            <h3>Live Preview</h3>
            <div className="status-badge">ATS Friendly</div>
          </div>
          <ResumePreview />
        </div>
      </main>
    </div>
  );
}

export default App;
