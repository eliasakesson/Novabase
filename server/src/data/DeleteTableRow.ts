import { OpenDatabase } from "../utils/FileSystem";

export default function DeleteTableRow(id: string, tableName: string, row: object[]): Promise<void>{
    return new Promise(async (res, rej) => {
        try {
            const sql = `DELETE FROM ${tableName} WHERE ${Object.values(row).map((col, i) => {
                return `${Object.keys(row)[i]} = ${typeof col === "string" ? `'${col}'` : col}`;
            }).join(" AND ")}`;

            const db = await OpenDatabase(`databases/${id}.db`);
    
            await db.run(sql);
    
            res();
        } catch (error) {
            rej({ error, status: 400 });
        }
    });
}