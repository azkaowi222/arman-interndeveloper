import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import jobsRoute from "./routes/jobsRuoute";
import applicationsRoute from "./routes/applicationsRoute";
import companiesRoute from "./routes/companiesRoute";
import authsRoute from "./routes/authsRoute";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/jobs", jobsRoute);
app.use("/api/applications", applicationsRoute);
app.use("/api/companie", companiesRoute);
app.use("/api/auth", authsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
