// express app config
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import itemRoutes from "./routes/itemRoutes";

const app = express();

app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Shadow Me Interns API" });
});

// Routes
app.use("/api/items", itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
