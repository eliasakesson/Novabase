export function CreateDatabase(name: string, ownerUID: string) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch(
				"http://localhost:8080/v1/data/databases",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, ownerUID }),
				}
			);

			const data = await fetched.json();

			if (data.ok) {
				res(data.body);
			}

			rej(data.body);
		} catch (err: any) {
			rej(err.body);
		}
	});
}

export function GetDatabase(id: string) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch(
				`http://localhost:8080/v1/data/databases/${id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await fetched.json();

			if (data.ok) {
				res(data.body);
			}

			rej(data.body);
		} catch (err: any) {
			rej(err.body);
		}
	});
}

export function CreateTable(
	id: string,
	tableName: string,
	tableSchema: { key: string; type: string }[]
) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch(
				`http://localhost:8080/v1/data/databases/${id}/tables`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ tableName, tableSchema }),
				}
			);

			const data = await fetched.json();

			if (data.ok) {
				res(data.body);
			}

			rej(data.body);
		} catch (err: any) {
			rej(err.body);
		}
	});
}

export function GetTable(id: string, tableName: string) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch(
				`http://localhost:8080/v1/data/databases/${id}/tables/${tableName}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await fetched.json();

			if (data.ok) {
				res(data.body);
			}

			rej(data.body);
		} catch (err: any) {
			rej(err.body);
		}
	});
}

export function GetTables(id: string) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch(
				`http://localhost:8080/v1/data/databases/${id}/tables`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await fetched.json();

			if (data.ok) {
				res(data.body);
			}

			rej(data.body);
		} catch (err: any) {
			rej(err.body);
		}
	});
}

export function DeleteTable(id: string, tableName: string) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch(
				`http://localhost:8080/v1/data/databases/${id}/tables/${tableName}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await fetched.json();

			if (data.ok) {
				res(data.body);
			}

			rej(data.body);
		} catch (err: any) {
			rej(err.body);
		}
	});
}

export function InsertIntoTable(
	id: string,
	tableName: string,
	table: [{ key: string; value: string }]
) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch(
				`http://localhost:8080/v1/data/databases/${id}/tables/${tableName}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ table }),
				}
			);

			const data = await fetched.json();

			if (data.ok) {
				res(data.body);
			}

			rej(data.body);
		} catch (err: any) {
			rej(err.body);
		}
	});
}

export function DeleteTableRow(
	id: string,
	tableName: string,
	row: [{ key: string; value: string }]
) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch(
				`http://localhost:8080/v1/data/databases/${id}/tables/${tableName}/rows`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ row }),
				}
			);

			const data = await fetched.json();

			if (data.ok) {
				res(data.body);
			}

			rej(data.body);
		} catch (err: any) {
			rej(err.body);
		}
	});
}
