import { useDashboard } from "../../DashboardContext";
import { GetTable } from "@/utils/DataManager";
import React, { useEffect, useState } from "react";

export default function Table() {
	const { selectedDatabase, selectedTable } = useDashboard();
	const [table, setTable] = useState<any[]>([]);

	useEffect(() => {
		if (!selectedTable || !selectedDatabase) return;

		GetTable(selectedDatabase.id, selectedTable.name)
			.then((res: any) => {
				setTable(res);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [selectedTable]);

	return (
		<div>
			<h1>Table</h1>
			{selectedTable && <h1>{selectedTable.name}</h1>}
		</div>
	);
}
