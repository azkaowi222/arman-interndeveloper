import express, { Router } from "express";
import {
  addJob,
  deleteJob,
  getAllJobs,
  getJobsById,
  updateJob,
} from "../controllers/jobsController";
import { companyMiddleware } from "../middleware/companyMiddleware";

const route: Router = express.Router();

route.post("/create", companyMiddleware, addJob);
route.get("/", getAllJobs);
route.get("/:jobId", getJobsById);
route.patch("/:jobId", updateJob);
route.delete("/:jobId", deleteJob);

export default route;
