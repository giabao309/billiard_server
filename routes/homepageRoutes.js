import express from "express";
import homepageController from "../controllers/homepageController.js";

const router = express.Router();

router.post("/homepage", homepageController.getHomePageByName);

export default router;
