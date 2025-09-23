// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();

// ---------- Core middleware ----------
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000", // CRA fallback
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("✅ API is running. Try /api/register or /api/login");
});

// ---------- MongoDB connection ----------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// ---------- User schema & model ----------
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }, // "user" or "admin"
});
const User = mongoose.model("User", userSchema);

// ---------- Auth middleware ----------
function auth(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role }
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

// ---------- Auth Routes ----------
// Register
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ success: false, message: "Email already exists" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Error registering user", error: err.message });
    }
  }
});

// List all users (admin only)
app.get("/api/users", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin only" });
    }

    const users = await User.find().select("-password").lean(); // Exclude password
    res.json({ success: true, data: users });
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ success: true, message: `Welcome ${user.role}`, token, role: user.role });
});

// Create default admin (for demo)
async function createAdmin() {
  const admin = await User.findOne({ email: "admin@gmail.com" });
  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      name: "Admin",
    });
    console.log("👑 Default admin created (Email: admin@gmail.com, Password: admin)");
  }
}
createAdmin();

// ---------- Mount Submissions Route ----------
const submissionsRoute = require("./routes/submissions");
app.use("/api/submissions", submissionsRoute);


const uploadRoutes = require("./routes/upload");
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static("public/uploads"));

// ---------- Mount Comments Route ----------
const commentRoutes = require("./routes/comment");
app.use("/api/comments", commentRoutes);


// Serve static React files
app.use(express.static(path.join(__dirname, "../dist")));

// Catch-all (React Router)
app.use( (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// ---------- Start server ----------
// ---------- Start server ----------
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // listen on all network interfaces

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});

