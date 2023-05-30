import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export function CreateFile(filePath: string, fileName: string): Promise<void> {
	return new Promise((res, rej) => {
		try {
			const dir = path.join(__dirname, "../../data", filePath);

			// check if the directory exists, create it if it doesn't
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}

			const file = path.join(dir, fileName);

			// check if the file exists, create it if it doesn't
			if (!fs.existsSync(file)) {
				fs.writeFileSync(file, "");
			}

			fs.writeFile(file, "", (err) => {
				if (err) rej(err);
				res();
			});
		} catch (err) {
			rej(err);
		}
	});
}

export function OpenDatabase(filePath: string): Promise<any> {
	return new Promise(async (res, rej) => {
		try {
			const file = path.join(__dirname, "../../data", filePath);

			const db = await open({
				filename: file,
				driver: sqlite3.Database,
			});

			res(db);
		} catch (err) {
			rej("Error opening database");
		}
	});
}
