const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // important for parsing JSON bodies

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submission and forward to Flask backend
app.post('/submit', async (req, res) => {
  const formData = req.body;

  try {
    const response = await fetch('http://flask-backend:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    res.send(`Backend Response: ${JSON.stringify(data)}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to backend');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
