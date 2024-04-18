import express from "express";
import morgan from "morgan";
import db from "./modules/db";

const app = express();

app.use(morgan("dev"));

app.get("/", async (req, res) => {
  const submissions = await db.submission.findMany();
  res.json(submissions);
});

const port = Number(process.env.PORT ?? 8080);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});
