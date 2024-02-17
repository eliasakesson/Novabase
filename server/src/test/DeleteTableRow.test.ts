describe("Test DeleteTableRow function", () => {
    it("should generate a valid SQL query", () => {
        const tableName = "Worlds"
        const row = {Name: 'Elias Värld', Seed: 76846578285, Time: 17.59}
        const sql = `DELETE FROM ${tableName} WHERE ${Object.values(row).map((col, i) => {
            return `${Object.keys(row)[i]} = ${typeof col === "string" ? `'${col}'` : col}`;
        }).join(" AND ")}`;

        expect(sql).toBe("DELETE FROM Worlds WHERE Name = 'Elias Värld' AND Seed = 76846578285 AND Time = 17.59");
    });
});