import express from "express";
import cors from "cors";
import tableRoutes from "./routes/tableRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import invoicesRoutes from "./routes/invoicesRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/invoices", invoicesRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
