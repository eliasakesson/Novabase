import { OpenDatabase } from "../utils/FileSystem";

export default function RemoveTable(id: string, tableID: string): Promise<void> {
    return new Promise(async (res, rej) => {
        try {
            const db = await OpenDatabase(`databases/${id}.db`);
    
            await db.run(`DROP TABLE ${tableID}`);
    
            res();
        } catch (error) {
            rej({ error: "Failed to remove table", status: 500 });
        }
    });
}