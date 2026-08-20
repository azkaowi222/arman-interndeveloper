import express, { Router } from "express";
import {
  apply,
  getAllApplications,
  getApplicationByJobId,
  updateApplications,
  getApplicationById,
} from "../controllers/applicationsController";
import { authMiddleware } from "../middleware/authMiddleware";

const route: Router = express.Router();

route.post("/", authMiddleware, apply);
route.patch("/:applicationId", updateApplications);
route.get("/", authMiddleware, getAllApplications);
route.get("/:jobId", getApplicationByJobId);
route.get("/id/:applicationId", getApplicationById);

export default route;
