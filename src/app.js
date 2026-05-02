// const express=require('express');
// const authRoutes=require("./routes/auth.route")
// const app=express();
// app.use(express.json());
// app.use("/api/auth",authRoutes);
// module.exports=app;


const express = require('express');
const cors = require('cors'); // ✅ add this
const authRoutes = require("./routes/auth.route");

const app = express();

// ✅ middleware
app.use(cors()); // 🔥 very important (frontend connect ke liye)
app.use(express.json());

// ✅ routes
app.use("/api/auth", authRoutes);

module.exports = app;