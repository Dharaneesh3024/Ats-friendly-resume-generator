const resumeSchema = {
  header: {
    fullName: "",
    email: "",
    phone: "",
    location: "", // Added
    linkedin: "",
    github: ""
  },

  summary: "",

  skills: {
    languages: [],
    frameworks: [],
    tools: []
  },

  experience: [],

  projects: [],

  education: [],

  certifications: []
};

export default resumeSchema;
