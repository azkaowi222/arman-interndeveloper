import express, { Router } from "express";
import { getUsersApplied } from "../controllers/companiesController";

const route: Router = express.Router();

route.get("/:companyId", getUsersApplied);

export default route;
