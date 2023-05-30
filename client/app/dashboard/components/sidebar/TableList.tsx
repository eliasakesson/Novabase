import { useDashboard } from "../../DashboardContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GetTables } from "@/utils/DataManager";
import React, { useState, useEffect } from "react";

export default function TableList() {
	const { selectedDatabase, selectedTable, setSelectedTable } =
		useDashboard();
	const [tables, setTables] = useState<any[]>([]);

	useEffect(() => {
		SetTables();
	}, [selectedDatabase]);

	useEffect(() => {
		if (!selectedTable) return;

		if (!tables.includes(selectedTable)) {
			SetTables();
		}
	}, [selectedTable]);

	function SetTables() {
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
	}

	if (!selectedDatabase) return null;

	return (
		<div className={tables.length > 0 ? "flex-1" : ""}>
			<Label>Tables</Label>
			<ul className="flex flex-col mt-2">
				{tables.map((table) => (
					<Button
						key={table.name}
						variant="ghost"
						className="justify-start"
						onClick={() => setSelectedTable(table)}
					>
						{table.name}
					</Button>
				))}
			</ul>
		</div>
	);
}
