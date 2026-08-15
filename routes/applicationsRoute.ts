import express, { Router } from "express";
import {
  apply,
  getApplicationById,
  updateApplications,
} from "../controllers/applicationsController";

const route: Router = express.Router();

route.post("/", apply);
route.patch("/:applicationId", updateApplications);
route.get("/:userId", getApplicationById);

export default route;
