const express = require("express");
const {
  getPublicGranitePosts,
  getAdminGranitePosts,
  createGranitePost,
  updateGranitePost,
  softDeleteGranitePost,
} = require("../controllers/granitePostController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getPublicGranitePosts);

router.get("/admin", protect, getAdminGranitePosts);
router.post("/admin", protect, upload.single("image"), createGranitePost);
router.patch("/admin/:id", protect, upload.single("image"), updateGranitePost);
router.delete("/admin/:id", protect, softDeleteGranitePost);

module.exports = router;