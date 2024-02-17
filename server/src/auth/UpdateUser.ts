import { OpenDatabase } from "../utils/FileSystem";
import { GetUser } from "./GetUser";

export function UpdateUser(property: string, value: string, uid: string) {
	return new Promise(async (res, rej) => {
		try {
			const db = await OpenDatabase("users.db");

			await db.run(
				`UPDATE users SET ${property} = ? WHERE uid = ?`,
				[value, uid],
				(error: any) => {
					if (error) rej({ error, status: 500 });
				}
			);

			const user = await GetUser(uid);

			res(user);
		} catch (error) {
			rej({ error, status: 500 });
		}
	});
}
