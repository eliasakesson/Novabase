import express from "express";
import CreateDatabase from "./CreateDatabase";
import CreateTable from "./CreateTable";
import GetDatabase from "./GetDatabase";
import GetTables from "./GetTables";
import GetTable from "./GetTable";
import RemoveTable from "./RemoveTable";
import PostTable from "./PostTable";

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

router.get("/databases/:id/tables", (req, res) => {
	const { id } = req.params;

	GetTables(id)
		.then((tables) => {
			res.status(200).send(JSON.stringify({ body: tables, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.post("/databases/:id/tables/:tableName", (req, res) => {
	const { id, tableName } = req.params;
	const { table } = req.body;
	console.log(table);

	PostTable(id, tableName, table)
		.then((table) => {
			res.status(200).send(JSON.stringify({ body: table, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.get("/databases/:id/tables/:tableName", (req, res) => {
	const { id, tableName } = req.params;

	GetTable(id, tableName)
		.then((table) => {
			res.status(200).send(JSON.stringify({ body: table, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.delete("/databases/:id/tables/:tableId", (req, res) => {
	const { id, tableId } = req.params;

	RemoveTable(id, tableId)
		.then(() => {
			res.status(200).send(JSON.stringify({ body: {}, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

export default router;
