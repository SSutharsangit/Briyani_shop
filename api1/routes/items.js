const express = require('express');
const router = express.Router();
const ItemModel = require('../models/item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get one item
router.get('/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await ItemModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Create new item
router.post('/', async (req, res) => {
  const { title, price, imageUrl } = req.body;

  try {
    const newItem = await ItemModel.create({ title, price, imageUrl });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Update item
router.put('/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { title, price, imageUrl } = req.body;

  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      { title, price, imageUrl },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete item
router.delete('/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    const deletedItem = await ItemModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, data: deletedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
