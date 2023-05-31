import { v4 as uuidv4 } from "uuid";
import { OpenDatabase } from "../utils/FileSystem";
import { GetUser, GetUserByEmail } from "./GetUser";

export default function CreateUser({
	username,
	password,
	email,
}: {
	username: string;
	password: string;
	email: string;
}) {
	return new Promise(async (res, rej) => {
		try {
			if (!ValidUsername(username))
				rej({
					error: "Username must be at least 5 characters long.",
					status: 400,
				});
			if (!ValidPassword(password))
				rej({
					error: "Password must be at least 8 characters long.",
					status: 400,
				});
			if (!ValidEmail(email))
				rej({ error: "Email must be valid.", status: 400 });

			const db = await OpenDatabase("users.db");
			await CreateUserTable(db);

			GetUserByEmail(email)
				.then(() => {
					rej({
						error: "User with that email already exists.",
						status: 400,
					});
				})
				.catch(() => {});

			const uid = uuidv4();
			await InsertUser(db, uid, username, password, email);

			const user = await GetUser(uid);

			res(user);
		} catch (error) {
			rej(error);
		}
	});
}

function ValidUsername(username: string): boolean {
	return username.length >= 5;
}

function ValidPassword(password: string): boolean {
	return password.length >= 8;
}

function ValidEmail(email: string): boolean {
	const regex = /\S+@\S+\.\S+/;
	return regex.test(email);
}

function CreateUserTable(db: any): Promise<void> {
	return new Promise((res, rej) => {
		try {
			db.run(
				`CREATE TABLE IF NOT EXISTS users (
                uid TEXT PRIMARY KEY,
                username TEXT,
                password TEXT,
                email TEXT,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				databases TEXT DEFAULT ${JSON.stringify([])}
            )`
			);

			res();
		} catch (err) {
			rej({ error: "Failed to create user table.", status: 500 });
		}
	});
}

function InsertUser(
	db: any,
	id: string,
	username: string,
	password: string,
	email: string
): Promise<void> {
	return new Promise(async (res, rej) => {
		try {
			await db.run(
				`INSERT INTO users (uid, username, password, email) VALUES (?, ?, ?, ?)`,
				[id, username, password, email]
			);

			res();
		} catch (err) {
			rej({ error: "Failed to insert user.", status: 500 });
		}
	});
}
