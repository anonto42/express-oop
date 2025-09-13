import express from "express";
import mainRoute from "./mainRoute";

const app = express();

app.use(mainRoute);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3800, () => {
  console.log("Server running on port 3800");
});
