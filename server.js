const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Item } = require('./models');

const app = express();
app.use(bodyParser.json());

// Sync database and create the table
sequelize.sync();

// POST /boards - Create a new item
app.post('/boards', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).send({ error: "Name is required" });

        const newItem = await Item.create({ name });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// PUT /boards/:id - Update the stage of an item
app.put('/boards/:id', async (req, res) => {
    try {
        const { stage } = req.body;
        const itemId = req.params.id;

        if (![1, 2, 3].includes(stage)) {
            return res.status(400).send();
        }

        const item = await Item.findByPk(itemId);
        if (!item) return res.status(404).send({ error: "Item not found" });

        item.stage = stage;
        await item.save();

        res.status(200).json(item);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
