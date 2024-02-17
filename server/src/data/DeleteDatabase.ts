import { DeleteFile } from "../utils/FileSystem";

export default function DeleteDatabase(id: string): Promise<void> {
	return new Promise(async (res, rej) => {
		try {
			await DeleteFile(`databases/${id}.db`);

			res();
		} catch (error) {
			rej({ error: "Database not found.", status: 404 });
		}
	});
}
