import { useDashboard } from "../../DashboardContext";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { GetTable } from "@/utils/DataManager";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface TableProps {
	columns: { name: string; type: string }[];
	rows: object[];
}

export default function Table() {
	const { selectedDatabase, selectedTable } = useDashboard();
	const [table, setTable] = useState<TableProps>({ columns: [], rows: [] });

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

	function removeTable() {}

	if (!selectedTable) return null;

	return (
		<div className="flex flex-col gap-4 items-start">
			<div className="flex items-center gap-4">
				<h1 className="text-3xl font-extrabold">
					{selectedTable.name}
				</h1>
				<ConfirmDialog onConfirm={() => {}}>
					<Button variant="ghost">
						<Trash2 size={20} />
					</Button>
				</ConfirmDialog>
			</div>
			<table className="w-full">
				<thead>
					<tr>
						{table.columns.map((column, i) => (
							<th
								key={i}
								className="p-2 border flex items-center gap-2"
							>
								<span>{column.name}</span>
								<span className="text-xs text-gray-400">
									({column.type})
								</span>
							</th>
						))}
						<th>
							<Button variant="ghost" className="ml-4">
								Add Column
							</Button>
						</th>
					</tr>
				</thead>
				<tbody>
					{table.rows.map((row, i) => (
						<tr key={i}></tr>
					))}
				</tbody>
			</table>
			<Button variant="default">Add Row</Button>
		</div>
	);
}
