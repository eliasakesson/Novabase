import { OpenDatabase } from "../utils/FileSystem";

export default async function AlterUsersTable() {
	const db = await OpenDatabase("users.db");

	db.run(`DROP TABLE users`);

	db.run(
		`ALTER TABLE users ADD COLUMN databases TEXT DEFAULT ${JSON.stringify(
			[]
		)}`,
		(err: any) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log("New column added successfully");
			}
		}
	);
}
