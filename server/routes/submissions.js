// routes/submissions.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { Readable } = require("stream");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Setup transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------- Submission schema ----------
const submissionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    email: { type: String, required: true },
    organization: String,
    description: { type: String, required: true },
    abstract: { type: String, required: true },
    keywords: [String],
    pdfFileId: { type: mongoose.Schema.Types.ObjectId, required: true }, // MongoDB
    pdfFilename: String, // original filename
    localFile: String,   // ✅ stored filename in /uploads folder
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "submitted" },
    downloadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Submission =
  mongoose.models.Submission || mongoose.model("Submission", submissionSchema);

// ---------- Auth middleware ----------
function auth(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role, email }
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

// ---------- GridFS setup ----------
let gridfsBucket;
mongoose.connection.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "pdfs",
  });
  console.log("📂 GridFS bucket ready");
});

// ---------- Multer setup ----------
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 25 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") cb(null, true);
//     else cb(new Error("Only PDF files are allowed"));
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads")); // save to uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  },
});

// ---------- Routes ----------

// Create submission
router.post("/", auth, upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "PDF is required" });
    }

    const { title, author, email, organization, description, abstract, keywords = "" } = req.body;

    // ✅ File info from multer
    const uniqueFilename = req.file.filename;
    const uploadPath = req.file.path;

    // ✅ Upload to GridFS too
    const readable = fs.createReadStream(uploadPath);
    const uploadStream = gridfsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
      metadata: { title, author, email },
    });

    readable
      .pipe(uploadStream)
      .on("error", (err) => {
        console.error("GridFS upload error:", err);
        return res.status(500).json({ success: false, message: "File upload failed" });
      })
      .on("finish", async () => {
        try {
          const doc = await Submission.create({
            title,
            author,
            email,
            organization,
            description,
            abstract,
            keywords: String(keywords)
              .split(",")
              .map((k) => k.trim())
              .filter(Boolean),
            pdfFileId: uploadStream.id,  // MongoDB GridFS
            pdfFilename: req.file.originalname,
            localFile: uniqueFilename,   // Saved in /uploads
            uploadedBy: new mongoose.Types.ObjectId(req.user.id),
          });

          // Send notification emails
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "tpspythonteam1@gmail.com",
            subject: "New Paper Submission Received",
            text: `A new paper has been submitted.\n\nTitle: ${title}\nAuthor: ${author}\nEmail: ${email}\nOrganization: ${organization}\nAbstract: ${abstract}`,
          });

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Submission Acknowledgment - IJEMS",
            text: `Dear ${author},\n\nYour paper titled "${title}" has been successfully submitted and is under review.\n\nThank you for your contribution!\n\nRegards,\nIJEMS Team`,
          });

          return res.json({
            success: true,
            message: "Submission created (MongoDB + local folder)",
            submissionId: doc._id,
          });
        } catch (dbErr) {
          console.error("Database or mail error:", dbErr);
          return res.status(500).json({ success: false, message: "Database or mail error" });
        }
      });
  } catch (err) {
    console.error("Create submission error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------- Utility ----------
function normalize(list) {
  return list.map((s) => ({ ...s, downloadCount: s.downloadCount ?? 0 }));
}

// My submissions
router.get("/mine", auth, async (req, res) => {
  try {
    const list = await Submission.find({ uploadedBy: req.user.id }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: normalize(list) });
  } catch (err) {
    console.error("Error fetching user's submissions:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// All submissions (admin only)
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin only" });
  }
  try {
    const list = await Submission.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: normalize(list) });
  } catch (err) {
    console.error("Error fetching all submissions:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Approved submissions
router.get("/approved", async (req, res) => {
  try {
    const list = await Submission.find({ status: "approved" }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: normalize(list) });
  } catch (err) {
    console.error("Error fetching approved submissions:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Submission details
router.get("/details/:id", async (req, res) => {
  try {
    const paper = await Submission.findById(req.params.id).lean();
    if (!paper) return res.status(404).json({ success: false, message: "Paper not found" });
    paper.downloadCount = paper.downloadCount ?? 0;
    res.json({ success: true, data: paper });
  } catch (err) {
    console.error("Error in /details/:id", err);
    res.status(400).json({ success: false, message: "Invalid paper id" });
  }
});

// Helper: stream file and increment counter
async function streamAndIncrement(fileId, res, auth = false) {
  if (!gridfsBucket) {
    return res.status(503).json({ success: false, message: "File store not ready" });
  }

  const filesCollection = mongoose.connection.db.collection("pdfs.files");
  const fileDoc = await filesCollection.findOne({ _id: fileId });
  if (!fileDoc) return res.status(404).json({ success: false, message: "File not found" });

  // increment downloadCount
  await Submission.findOneAndUpdate({ pdfFileId: fileId }, { $inc: { downloadCount: 1 } });

  res.set({
    "Content-Type": "application/pdf",
    ...(auth ? {} : { "Content-Disposition": `attachment; filename="${fileDoc.filename}"` }),
  });

  const downloadStream = gridfsBucket.openDownloadStream(fileId);
  downloadStream.pipe(res).on("error", () => {
    res.status(404).json({ success: false, message: "File not found" });
  });
}

// Authenticated download
router.get("/files/:id", auth, async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    await streamAndIncrement(fileId, res, true);
  } catch (err) {
    console.error("Error in /files/:id", err);
    res.status(400).json({ success: false, message: "Invalid file id" });
  }
});

// Public download
router.get("/public/files/:id", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    await streamAndIncrement(fileId, res, false);
  } catch (err) {
    console.error("Error in /public/files/:id", err);
    res.status(400).json({ success: false, message: "Invalid file id" });
  }
});

// Manual increment
router.patch("/:id/increment", async (req, res) => {
  try {
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: "Submission not found" });
    res.json({ success: true, downloadCount: updated.downloadCount });
  } catch (err) {
    console.error("Error incrementing downloadCount:", err);
    res.status(400).json({ success: false, message: "Invalid submission id" });
  }
});

// Update status (admin only)
router.patch("/:id/status", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin only" });
  }
  try {
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Failed to update status:", err);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});

module.exports = router;
