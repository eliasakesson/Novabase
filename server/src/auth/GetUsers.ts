import { OpenDatabase } from "../utils/FileSystem";

export function GetUsers() {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase("users.db");

			let columns = await db.all(`PRAGMA table_info(users)`);
			const users = await db.all(`SELECT * FROM users`);

			if (
				(!users || users.length === 0) &&
				(!columns || columns.length === 0)
			) {
				rej({ error: `Table users is empty.`, status: 404 });
			}

			columns = columns.filter(
				(column: any) => column.name !== "password"
			);

			users.forEach((user: any) => {
				delete user.password;
			});

			res({ columns, rows: users });
		} catch (error) {
			rej({ error: "User not found.", status: 404 });
		}
	});
}
