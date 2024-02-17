import { v4 as uuidv4 } from "uuid";
import { CreateFile, OpenDatabase } from "../utils/FileSystem";
import { GetUser } from "../auth/GetUser";
import GetDatabase from "./GetDatabase";

export default function CreateDatabase(name: string, ownerUID: string) {
	return new Promise(async (res, rej) => {
		try {
			if (!(await GetUser(ownerUID)))
				rej({ error: "User not found.", status: 404 });

			const id = uuidv4();

			await CreateFile("databases", `${id}.db`);
			const db = await OpenDatabase(`databases/${id}.db`);

			await CreateDatabaseTable(db);
			await InsertDatabase(db, id, name, ownerUID);
			await AddDatabaseToUser(ownerUID, id);
			const database = await GetDatabase(id);
			console.log(database);

			res(database);
		} catch (error) {
			rej(error);
		}
	});
}

function CreateDatabaseTable(db: any): Promise<void> {
	return new Promise(async (res, rej) => {
		try {
			await db.run(`CREATE TABLE IF NOT EXISTS __database (
                id TEXT PRIMARY KEY,
                name TEXT,
                ownerUID TEXT
            )`);

			res();
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}

function InsertDatabase(
	db: any,
	id: string,
	name: string,
	ownerUID: string
): Promise<void> {
	return new Promise(async (res, rej) => {
		try {
			await db.run(
				`INSERT INTO __database (id, name, ownerUID) VALUES (?, ?, ?)`,
				[id, name, ownerUID]
			);

			res();
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}

function AddDatabaseToUser(
	ownerUID: string,
	databaseID: string
): Promise<void> {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase("users.db");

			const user = (await GetUser(ownerUID)) as { databases: string };
			console.log(user);

			const databases = user.databases ? JSON.parse(user.databases) : [];
			databases.push(databaseID);
			console.log(databases);

			await db.run(`UPDATE users SET databases = ? WHERE uid = ?`, [
				JSON.stringify(databases),
				ownerUID,
			]);

			res();
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}
