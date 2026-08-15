import express from "express";
import "dotenv/config";
import jobsRoute from "./routes/jobsRuoute";
import applicationsRoute from "./routes/applicationsRoute";
import companiessRoute from "./routes/companiesRoute";

const app = express();
app.use(express.json());

app.use("/api/jobs", jobsRoute);
app.use("/api/applications", applicationsRoute);
app.use("/api/companies", companiessRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
