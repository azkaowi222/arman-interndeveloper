import express, { Router } from "express";
import {
  getJobsByCompaniId,
  getUsersApplied,
} from "../controllers/companiesController";
import { companyMiddleware } from "../middleware/companyMiddleware";

const route: Router = express.Router();

route.get("/jobs", companyMiddleware, getJobsByCompaniId);
route.get("/:companyId", companyMiddleware, getUsersApplied);

export default route;
