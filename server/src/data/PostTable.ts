import { OpenDatabase } from "../utils/FileSystem";

export default function PostTable(
	id: string,
	tableName: string,
	table: { key: string; value: string }[]
) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase(`databases/${id}.db`);

			const sql = `INSERT INTO ${tableName} (${table
				.map((col) => col.key)
				.join(", ")}) VALUES (${table
				.map((col) => col.value)
				.join(", ")})`;
			console.log(sql);

			await db.run(sql);

			res(table);
		} catch (error) {
			rej({ error: "No table with that name", status: 400 });
		}
	});
}
