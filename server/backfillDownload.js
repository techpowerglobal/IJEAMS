// server/backfillDownloadCount.js
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

// Import Submission model from routes/submissions.js schema
const submissionSchema = require("./routes/submissions").submissionSchema
  ? require("./routes/submissions").submissionSchema
  : null;

// If the schema is not exported, redefine it here (copy the schema from submissions.js)
const Submission =
  submissionSchema ||
  mongoose.model(
    "Submission",
    new mongoose.Schema({
      title: String,
      author: String,
      email: String,
      organization: String,
      description: String,
      abstract: String,
      keywords: [String],
      pdfFileId: mongoose.Schema.Types.ObjectId,
      pdfFilename: String,
      uploadedBy: mongoose.Schema.Types.ObjectId,
      status: String,
      downloadCount: { type: Number, default: 0 },
    })
  );

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    const result = await Submission.updateMany(
      { downloadCount: { $exists: false } },
      { $set: { downloadCount: 0 } }
    );

    console.log(`✨ Modified ${result.modifiedCount} documents`);
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();
