import { useResume } from "../context/ResumeContext";

const HeaderForm = () => {
  const { resume, setResume } = useResume();

  const handleChange = (e) => {
    setResume({
      ...resume,
      header: {
        ...resume.header,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <div>
      <h3>Personal Details</h3>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="location" placeholder="Location (e.g., New York, NY)" value={resume.header.location} onChange={handleChange} />
      <input name="linkedin" placeholder="LinkedIn URL" value={resume.header.linkedin} onChange={handleChange} />
      <input name="github" placeholder="GitHub URL" value={resume.header.github} onChange={handleChange} />
    </div>
  );
};

export default HeaderForm;
