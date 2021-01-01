// This file exports the information from routes\api\posts.js to routes\index.js
const router = require("express").Router();
const postRoutes = require("./posts");

// Exports the post routes
router.use("/posts", postRoutes);

module.exports = router;
