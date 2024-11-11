import express from "express";
import cors from "cors";
import tableRoutes from "./routes/tableRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import floorRoutes from "./routes/floorRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tables", tableRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/floors", floorRoutes);
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
