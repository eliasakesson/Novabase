import express from "express";
import cors from "cors";
import AuthRouter from "./auth/AuthRouter";
import DataRouter from "./data/DataRouter";
import AlterUsersTable from "./auth/AlterUsersTable";

const app = express();
const port = 8080;

const v1Router = express.Router();
v1Router.use("/auth", AuthRouter);
v1Router.use("/data", DataRouter);

app.use(express.json());
app.use(cors());
app.use("/v1", v1Router);

// AlterUsersTable();

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
