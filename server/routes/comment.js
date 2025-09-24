// routes/comment.js
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const router = express.Router();

// ---------- Comment Schema ----------
const CommentSchema = new mongoose.Schema({
  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Submission",
  },
  userEmail: {
    type: String,
    required: true,
  },
  adminId: {
    type: String, // optional
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  read: {
    type: Boolean,
    default: false, // <-- new field for notifications
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent OverwriteModelError on hot-reload
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

// ---------- Nodemailer ----------
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER || "tpspythonteam1@gmail.com",
    pass: process.env.EMAIL_PASS || "zgri ndnq yzjr iexw",
  },
});

async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"IJAEMS Journal" <${process.env.EMAIL_USER || "tpspythonteam1@gmail.com"}>`,
      to,
      subject,
      text,
    });
    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
}

// ---------- Routes ----------

// Health check
router.get("/test", (req, res) => {
  res.json({ message: "✅ Comments route working!" });
});

// POST: Add comment
router.post("/", async (req, res) => {
  try {
    const { submissionId, userEmail, comment, adminId } = req.body;
    if (!submissionId || !userEmail || !comment) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newComment = new Comment({ submissionId, userEmail, comment, adminId });
    await newComment.save();

    // Mark all comments as read for a user's submissions
router.put("/mark-read/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find all submissions by this user
    const userSubs = await Submission.find({ email }).select("_id");

    const subIds = userSubs.map((s) => s._id);

    // Update all comments related to those submissions
    await Comment.updateMany(
      { submissionId: { $in: subIds }, read: false },
      { $set: { read: true } }
    );

    res.json({ success: true, message: "All notifications marked as read" });
  } catch (err) {
    console.error("Error marking read:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


    // Send notification email
    await sendEmail(
      userEmail,
      "New Comment on Your Submission",
      `Your submission received a new comment:\n\n"${comment}"`
    );

    res.status(201).json({
      success: true,
      message: "✅ Comment added & email sent",
      comment: newComment,
    });
  } catch (error) {
    console.error("❌ Comment error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET: Fetch all comments for a submission (with title + author populated)
router.get("/:submissionId", async (req, res) => {
  try {
    const comments = await Comment.find({
      submissionId: req.params.submissionId,
    })
      .populate("submissionId", "title author") // populate only title and author
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    console.error("❌ Fetch comments error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT: Mark all comments as read for a user
router.put("/mark-read/:userEmail", async (req, res) => {
  try {
    await Comment.updateMany(
      { userEmail: req.params.userEmail, read: false },
      { $set: { read: true } }
    );
    res.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    console.error("❌ Mark read error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
