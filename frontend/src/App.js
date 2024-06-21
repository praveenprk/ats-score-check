// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5530/calculate', {
        resume,
        jobDescription,
      });
      setScore(response.data.score);
    } catch (error) {
      console.error('Error calculating ATS score:', error);
    }
  };

  return (
    <div>
      <h1>ATS Score Calculator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste your resume here"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
        <textarea
          placeholder="Paste the job description here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button type="submit">Calculate ATS Score</button>
      </form>
      {score && <h2>ATS Score: {score}%</h2>}
    </div>
  );
}

export default App;
