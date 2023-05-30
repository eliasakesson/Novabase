import { OpenDatabase } from "../utils/FileSystem";

export default function GetTable(id: string, name: string) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase(`databases/${id}.db`)

			const table = await db.all(`SELECT * FROM ${name}`);

			if (!table) rej({ error: `Table ${name} not found.`, status: 404 });

			res(table);
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}
