import { OpenDatabase } from "../utils/FileSystem";

export default function LoginUser({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase("users.db");

			const user = await db.get(
				`SELECT * FROM users WHERE email = ? AND password = ?`,
				[email, password]
			);

			delete user.password;

			res(user);
		} catch (error) {
			rej({ error: "No user with those credentials", status: 400 });
		}
	});
}
