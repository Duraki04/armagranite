const streamifier = require("streamifier");
const GranitePost = require("../models/GranitePost");
const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "armagranite/granite-posts",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

const getPublicGranitePosts = async (req, res) => {
  try {
    const posts = await GranitePost.find({ isDeleted: false }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Get public granite posts error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const getAdminGranitePosts = async (req, res) => {
  try {
    const posts = await GranitePost.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Get admin granite posts error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const createGranitePost = async (req, res) => {
  try {
    const { title, category, description, isFeatured } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, category and description are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    const uploadResult = await uploadImageToCloudinary(req.file.buffer);

    const post = await GranitePost.create({
      title,
      category,
      description,
      imageUrl: uploadResult.secure_url,
      isFeatured: isFeatured === "true" || isFeatured === true,
    });

    return res.status(201).json({
      success: true,
      message: "Granite post created successfully.",
      data: post,
    });
  } catch (error) {
    console.error("Create granite post error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const updateGranitePost = async (req, res) => {
  try {
    const { title, category, description, isFeatured } = req.body;

    const post = await GranitePost.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Granite post not found.",
      });
    }

    post.title = title || post.title;
    post.category = category || post.category;
    post.description = description || post.description;
    post.isFeatured = isFeatured === "true" || isFeatured === true;

    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file.buffer);
      post.imageUrl = uploadResult.secure_url;
    }

    const updatedPost = await post.save();

    return res.status(200).json({
      success: true,
      message: "Granite post updated successfully.",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Update granite post error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const softDeleteGranitePost = async (req, res) => {
  try {
    const post = await GranitePost.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Granite post not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Granite post deleted successfully.",
      data: post,
    });
  } catch (error) {
    console.error("Soft delete granite post error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = {
  getPublicGranitePosts,
  getAdminGranitePosts,
  createGranitePost,
  updateGranitePost,
  softDeleteGranitePost,
};