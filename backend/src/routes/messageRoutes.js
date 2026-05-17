const express = require("express");
const {
  getMessages,
  getMessageById,
  markMessageAsRead,
  softDeleteMessage,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getMessages);
router.get("/:id", protect, getMessageById);
router.patch("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, softDeleteMessage);

module.exports = router;