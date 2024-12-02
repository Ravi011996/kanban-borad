const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Import app setup (reuse from server.js)
const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run(`CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        stage INTEGER DEFAULT 1
    )`);
});

app.post('/boards', (req, res) => {
    const { name } = req.body;
    const sql = `INSERT INTO items (name) VALUES (?)`;
    db.run(sql, [name], function () {
        res.status(201).json({ id: this.lastID, name, stage: 1 });
    });
});

app.put('/boards/:id', (req, res) => {
    const { stage } = req.body;
    const itemId = req.params.id;

    if (![1, 2, 3].includes(stage)) {
        return res.status(400).send();
    }

    db.run(`UPDATE items SET stage = ? WHERE id = ?`, [stage, itemId], function () {
        db.get(`SELECT * FROM items WHERE id = ?`, [itemId], (err, item) => {
            res.status(200).json(item);
        });
    });
});

describe("Kanban Board API", () => {
    it("should create a new item", async () => {
        const response = await request(app).post('/boards').send({ name: "Task 1" });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Task 1");
        expect(response.body.stage).toBe(1);
    });

    it("should update the item's stage", async () => {
        await request(app).post('/boards').send({ name: "Task 1" });
        const response = await request(app).put('/boards/1').send({ stage: 2 });
        expect(response.status).toBe(200);
        expect(response.body.stage).toBe(2);
    });

    it("should return 400 for invalid stage", async () => {
        await request(app).post('/boards').send({ name: "Task 1" });
        const response = await request(app).put('/boards/1').send({ stage: 5 });
        expect(response.status).toBe(400);
    });
});
