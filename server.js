import express from "express";
import cors from "cors";

//ROUTES
import tableRoutes from "./routes/tableRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import invoicesRoutes from "./routes/invoicesRoutes.js";
import homepageRoutes from "./routes/homepageRoutes.js";
import manageRoutes from "./routes/manageRoutes.js";
import storageRoutes from "./routes/storageRoutes.js";

// Khởi tạo ứng dụng Express và HTTP server
const app = express();

app.use(cors());
app.use(express.json());

//ROUTE
app.use("/api/invoices", invoicesRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/manage", manageRoutes);
app.use("/api/storages", storageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
