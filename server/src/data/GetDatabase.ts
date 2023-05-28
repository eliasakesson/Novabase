import { OpenDatabase } from "../utils/FileSystem";

export default function GetDatabase(id: string) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase(`databases/${id}.db`);

			const database = await db.get(
				`SELECT * FROM database WHERE id = ?`,
				[id]
			);

			if (!database)
				rej({ error: `Database ${id} not found.`, status: 404 });

			res(database);
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}
