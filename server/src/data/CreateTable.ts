import { OpenDatabase } from "../utils/FileSystem";
import GetTable from "./GetTable";

export default function CreateTable(
	id: string,
	tableName: string,
	tableSchema: TableSchema
) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase(`databases/${id}.db`);

			await AddTable(db, tableName, tableSchema);
			const table = await GetTable(id, tableName);

			res(table);
		} catch (error) {
			rej(error);
		}
	});
}

interface TableSchema
	extends Array<{
		key: string;
		type: string;
	}> {}

function AddTable(
	db: any,
	tableName: string,
	tableSchema: TableSchema
): Promise<void> {
	return new Promise(async (res, rej) => {
		try {
			const tableExists = await db.get(
				`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
			);

			if (tableExists) {
				rej({
					error: `Table ${tableName} already exists`,
					status: 400,
				});
			} else {
				await db.run(
					`CREATE TABLE ${tableName} (
                        ${tableSchema
							.map(
								(column) =>
									`${column.key} ${column.type}`
							)
							.join(", ")}
                    )`
				);

				res();
			}
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}
