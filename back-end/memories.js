const express = require("express");
const mongoose = require('mongoose');
const users = require("./users.js")
const User = users.model;
const validUser = users.valid;

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')

const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 1000000000000
    }
});

const router = express.Router();

// Create a scheme for items in the museum: a title and a path to an image.
const memorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    path: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// Create a model for items in the museum.
const Memory = mongoose.model('Memory', memorySchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
router.post('/api/photos', validUser, upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// Create a new item in the museum: takes a title and a path to an image.
router.post('/api/items', validUser, async (req, res) => {
    const item = new Memory({
        user: req.user,
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
router.get('/api/items', validUser, async (req, res) => {
    try {
        let memories = await Memory.find({user: req.user}).sort({created: -1});
        res.send(memories);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/api/items/:id', validUser, async (req, res) => {
    try {
        await Memory.deleteOne({
            _id: req.params.id
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.put('/api/items/:id', validUser, async (req, res) => {
    try {
        let memory = await Memory.findOne({_id: req.params.id})
        memory.title = req.body.title
        memory.description = req.body.description
        memory.save()
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = {
    routes: router,
    // model: Memory
}
