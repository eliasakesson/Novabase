export default function GetTable(db: any, name: string) {
	return new Promise(async (res, rej) => {
		try {
			const table = await db.all(`SELECT * FROM ${name}`);

			if (!table) rej({ error: `Table ${name} not found.`, status: 404 });

			res(table);
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}
