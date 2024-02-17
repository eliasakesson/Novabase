import express from "express";
import CreateUser from "./CreateUser";
import LoginUser from "./LoginUser";
import { GetUser } from "./GetUser";
import { UpdateUser } from "./UpdateUser";
import { GetUsers } from "./GetUsers";

const router = express.Router();

router.post("/login", (req, res) => {
	LoginUser({ ...req.body })
		.then((user) => {
			res.status(201).send(JSON.stringify({ body: user, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.get("/users", (req, res) => {
	GetUsers()
		.then((users) => {
			res.status(200).send(JSON.stringify({ body: users, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.post("/users", (req, res) => {
	CreateUser({ ...req.body })
		.then((user) => {
			res.status(201).send(JSON.stringify({ body: user, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.put("/users", (req, res) => {
	UpdateUser(req.body.property, req.body.value, req.body.uid)
		.then((user) => {
			res.status(200).send(JSON.stringify({ body: user, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

router.get("/users/:uid", (req, res) => {
	const { uid } = req.params;

	GetUser(uid)
		.then((user) => {
			res.status(200).send(JSON.stringify({ body: user, ok: true }));
		})
		.catch((err) => {
			res.status(err.status).send(
				JSON.stringify({ body: err.error, ok: false })
			);
		});
});

export default router;
