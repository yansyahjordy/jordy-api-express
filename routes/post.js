const express = require("express");
const router = express.Router();
const Post = require("../models/News");

//get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//search news
router.get("/news/search", async (req, res) => {
  try {
    const posts = await Post.find({}, { title: 1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//home datas
router.get("/news", async (req, res) => {
  try {
    const posts = await Post.find({}, { title: 1, image: 1, timePosted: 1, author:1});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//1 home datas with content id
router.get("/news/:postID", async (req, res) => {
  try {
    const posts = await Post.find(
      { _id: req.params.postID },
      { title: 1, image: 1, timePosted: 1, content: 1, author: 1, tags: 1 }
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get spesific post by id
router.get("/:postID", getData, (req, res) => {
  res.json(res.posts);
});

//delete post by id
router.delete("/:postID", getData, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Deleted News" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update post by id
router.patch("/:postID", getData, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.image != null) {
    res.post.image = req.body.image;
  }
  if (req.body.timePosted != null) {
    res.post.timePosted = req.body.timePosted;
  }

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//post new data
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    image: req.body.image,
    timePosted: req.body.timePosted,
  });
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get data by id
async function getData(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.postID);
    if (post == null) {
      return res.status(404).json({ message: "Cant find news" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

module.exports = router;
