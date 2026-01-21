import { useResume } from "../context/ResumeContext";

const SummaryForm = () => {
  const { resume, setResume } = useResume();

  return (
    <div>
      <h3>Professional Summary</h3>
      <textarea
        placeholder="Write a short professional summary"
        onChange={(e) =>
          setResume({ ...resume, summary: e.target.value })
        }
      />
    </div>
  );
};

export default SummaryForm;
