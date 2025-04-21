const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes

app.get('/', (req, res) => res.send('Expense Tracker API Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
