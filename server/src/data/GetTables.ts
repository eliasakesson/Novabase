import { OpenDatabase } from "../utils/FileSystem";

export default function GetTables(id: string) {
    return new Promise(async (res, rej) => {
        try {
            const db = await OpenDatabase(`databases/${id}.db`);
            const tables = await db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '__database%'`);

            if (!tables) rej({ error: `No tables found.`, status: 404 });

            res(tables);
        } catch (error) {
            rej({ error, status: 500 });
        }
    });
}