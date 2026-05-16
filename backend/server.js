import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

// Jobs
import "./jobs/leetcodeCron.js";

dotenv.config();

const app = express();

// =================== MIDDLEWARE ===================
app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost port in development (fixes 5173 vs 5174 etc.)
    if (!origin || origin.startsWith("http://localhost") || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// =================== DATABASE ===================
connectDB();

// =================== HEALTH CHECK ===================
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: Math.floor(process.uptime()), timestamp: new Date().toISOString() });
});

// =================== ROUTES ===================
app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(feedbackRoutes);

// =================== 404 HANDLER ===================
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// =================== SERVER ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
