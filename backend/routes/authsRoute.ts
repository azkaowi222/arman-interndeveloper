import express, { Router } from "express";
import { login, verifyToken, logout } from "../controllers/authController";

const route: Router = express.Router();

route.post("/login", login);
route.post("/verify-token", verifyToken);
route.post("/logout", logout);

export default route;
