import { useDashboard } from "../../DashboardContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GetTables } from "@/utils/DataManager";
import React, { useState, useEffect } from "react";

export default function TableList() {
	const { selectedDatabase, setSelectedTable } = useDashboard();
	const [tables, setTables] = useState<any[]>([]);

	useEffect(() => {
		if (!selectedDatabase) return;

		GetTables(selectedDatabase.id)
			.then((res) => {
				if (Array.isArray(res) && res.length > 0) {
					setTables(res);
					setSelectedTable(res[0]);
				} else {
					setTables([]);
					console.log(res);
				}
			})
			.catch((err) => {
				setTables([]);
				console.log(err);
			});
	}, [selectedDatabase]);
	console.log(tables);

	if (!selectedDatabase) return null;

	return (
		<div className={tables.length > 0 ? "flex-1" : ""}>
			<Label>Tables</Label>
			<ul>
				{tables.map((table) => (
					<Button
						key={table.name}
						variant="ghost"
						className="w-full justify-start"
						onClick={() => setSelectedTable(table)}>
						{table.name}
					</Button>
				))}
			</ul>
		</div>
	);
}
