// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { OpenAI} = require('openai');

console.log(`env see:`, process.env.OPENAI_KEY);
const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAI(configuration);

app.post('/calculate', async (req, res) => {
  const { resume, jobDescription } = req.body;

  // Here we should compare the resume and job description using OpenAI API
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      prompt: `Compare the following resume and job description. Calculate the ATS score based on the matching skills and experience. 
Resume: ${resume}
Job Description: ${jobDescription}`,
      max_tokens: 100,
    });

    const atsScore = parseFloat(response.data.choices[0].text.trim());
    res.json({ score: atsScore });
  } catch (error) {
    console.error('Error calculating ATS score:', error);
    res.status(500).send('Error calculating ATS score');
  }
});

const PORT = process.env.PORT || 5530;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
