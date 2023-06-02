import { OpenDatabase } from "../utils/FileSystem";

export default function GetTable(id: string, name: string) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase(`databases/${id}.db`);

			const columns = await db.all(`PRAGMA table_info(${name})`);
			const rows = await db.all(`SELECT * FROM ${name}`);

			if (
				(!rows || rows.length === 0) &&
				(!columns || columns.length === 0)
			) {
				rej({ error: `Table ${name} is empty.`, status: 404 });
			}

			res({ columns, rows });
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}
