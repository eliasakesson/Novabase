import { OpenDatabase } from "../utils/FileSystem";

export function GetUser(uid: string) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase("users.db");

			const user = await db.get(`SELECT * FROM users WHERE uid = ?`, [
				uid,
			]);

			delete user.password;

			res(user);
		} catch (error) {
			rej({ error: "User not found.", status: 404 });
		}
	});
}

export function GetUserByEmail(email: string) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase("users.db");

			const user = await db.get(`SELECT * FROM users WHERE email = ?`, [
				email,
			]);

			delete user.password;

			res(user);
		} catch (error) {
			rej({ error: "User not found", status: 404 });
		}
	});
}
