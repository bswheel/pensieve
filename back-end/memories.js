const express = require("express");
const mongoose = require('mongoose');
// const users = require("./users.js")
// const User = users.model;
// const validUser = users.valid;

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')

const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});

const router = express.Router();

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
router.post('/api/photos', upload.single('photo'), async (req, res) => {
    console.log("uploading photo")
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// Create a new item in the museum: takes a title and a path to an image.
router.post('/api/items', async (req, res) => {
    console.log("uploading item")
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        path: req.body.path,
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the items in the museum.
router.get('/api/items', async (req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/api/items/:id', async (req, res) => {
    try {
        await Item.deleteOne({
            _id: req.params.id
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.put('/api/items/:id', async (req, res) => {
    try {
        let item = await Item.findOne({_id: req.params.id})
        item.title = req.body.title
        item.description = req.body.description
        item.save()
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = {
    routes: router,
}
