const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*", // allow all for now (fix later)
}));
app.use(express.json());

// ✅ DATABASE CONNECTION (FIXED)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("❌ DB Error:", err);
    } else {
        console.log("✅ MySQL Connected");
    }
});

// ================= ROUTES =================

// Health check
app.get('/', (req, res) => {
    res.send("Backend running 🚀");
});

// ✅ REGISTER (FIXED + HASHING)
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashed],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: "User registered successfully!" });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ LOGIN (FIXED + JWT)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

        res.json({
            message: "Login successful",
            token,
            userId: user.id
        });
    });
});

// ✅ ADD NOTE
app.post('/add-note', (req, res) => {
    const { userId, content } = req.body;

    db.query(
        "INSERT INTO notes (user_id, content) VALUES (?, ?)",
        [userId, content],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Note added" });
        }
    );
});

// ✅ GET NOTES
app.get('/get-notes/:userId', (req, res) => {
    const { userId } = req.params;

    db.query(
        "SELECT * FROM notes WHERE user_id = ? ORDER BY id DESC",
        [userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
});

// ✅ DELETE NOTE
app.delete('/delete-note/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM notes WHERE id = ?",
        [id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Note deleted" });
        }
    );
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));