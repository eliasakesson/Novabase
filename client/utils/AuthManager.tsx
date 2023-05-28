export function Login(email: string, password: string) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch("http://localhost:8080/v1/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

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

export function Register(username: string, email: string, password: string) {
	return new Promise(async (res, rej) => {
		try {
			const fetched = await fetch("http://localhost:8080/v1/auth/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

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
