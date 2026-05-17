const Message = require("../models/Message");

const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    if (!name || !email || !phone || !projectType || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone,
      projectType,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been received successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = {
  createContactMessage,
};