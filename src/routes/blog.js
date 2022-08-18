const router = require("express").Router();

// middlewares
const validateUser=require("../middlewares/validateUser")

// controllers
const {
  createBlog,
  getAllBlogs,
  getBlogDetails,
  editBlog,
  deleteBlog,
} = require("../controllers/blog");

// get all blogs
router.get("/",validateUser, getAllBlogs);

// get all blogs
router.get("/:blogId",validateUser, getBlogDetails);

// create new blog
router.post("/create",validateUser, createBlog);

// edit blog
router.patch("/edit/:blogId",validateUser, editBlog);

// delete blog
router.delete("/delete/:blogId",validateUser, deleteBlog);

module.exports = router;
