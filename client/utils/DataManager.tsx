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
