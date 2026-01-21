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
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="linkedin" placeholder="LinkedIn" onChange={handleChange} />
      <input name="github" placeholder="GitHub" onChange={handleChange} />
    </div>
  );
};

export default HeaderForm;
