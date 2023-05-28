import express from "express";
import CreateDatabase from "./CreateDatabase";
import CreateTable from "./CreateTable";
import GetDatabase from "./GetDatabase";

const router = express.Router();

router.post("/databases", (req, res) => {
	const { name, ownerUID } = req.body;

	CreateDatabase(name, ownerUID)
		.then((database) => {
			res.status(200).send(JSON.stringify({ body: database, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.get("/databases/:id", (req, res) => {
	const { id } = req.params;

	GetDatabase(id)
		.then((database) => {
			res.status(200).send(JSON.stringify({ body: database, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.post("/databases/:id/tables", (req, res) => {
	const { id } = req.params;
	const { tableName, tableSchema } = req.body;

	CreateTable(id, tableName, tableSchema)
		.then((table) => {
			res.status(200).send(JSON.stringify({ body: table, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

export default router;
