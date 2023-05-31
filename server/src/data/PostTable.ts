import { OpenDatabase } from "../utils/FileSystem"

export default function PostTable(id: string, tableName: string, table: { columns: string[], values: string[] }){
    return new Promise(async (res, rej) => {
        try {
            const db = await OpenDatabase(`databases/${id}.db`)

            await db.run(`INSERT INTO ${tableName} (${table.columns.join(", ")}) VALUES (${table.values.join(", ")})`)

            res(table)
        } catch (error) {
            rej({ error: "No table with that name", status: 400 })
        }
    })
}