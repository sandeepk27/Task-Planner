const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the in-memory SQLite database.');
    db.run(`
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        category TEXT NOT NULL
      )
    `);
  }
});

// API Routes
app.post('/tasks', (req, res) => {
  const { task, category } = req.body;
  if (!task || !category) {
    return res.status(400).json({ error: 'Task and category are required.' });
  }
  const query = `INSERT INTO tasks (task, category) VALUES (?, ?)`;
  db.run(query, [task, category], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, task, category });
  });
});

app.get('/tasks', (req, res) => {
  const query = `SELECT * FROM tasks`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tasks WHERE id = ?`;
  db.run(query, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Task with ID ${id} deleted.` });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
