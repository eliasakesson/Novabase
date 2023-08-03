import { useDashboard } from "../../DashboardContext";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GetUsers } from "@/utils/AuthManager";
import {
	DeleteDatabase,
	DeleteTable,
	DeleteTableRow,
	GetTable,
	InsertIntoTable,
} from "@/utils/DataManager";
import { Trash2, Plus, Edit, Check } from "lucide-react";
import React, { useEffect, useState } from "react";

interface TableProps {
	columns: { name: string; type: string }[];
	rows: { key: string; value: string }[];
}

export default function Table() {
	const {
		selectedDatabase,
		setSelectedDatabase,
		selectedTable,
		setSelectedTable,
	} = useDashboard();
	const [table, setTable] = useState<TableProps>({ columns: [], rows: [] });
	console.log(table);
	const [rowToAdd, setRowToAdd] = useState<any>([]);

	useEffect(() => {
		getTable();
	}, [selectedTable]);

	function getTable() {
		if (!selectedTable || !selectedDatabase) return;

		if (selectedTable.name === "Users") {
			GetUsers()
				.then((res: any) => {
					setTable(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		GetTable(selectedDatabase.id, selectedTable.name)
			.then((res: any) => {
				setTable(res);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function removeTable() {
		if (!selectedTable || !selectedDatabase) return;

		DeleteTable(selectedDatabase.id, selectedTable.name)
			.then(() => {
				setSelectedTable(null);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function addRow() {
		if (!selectedTable || !selectedDatabase) return;

		InsertIntoTable(selectedDatabase.id, selectedTable.name, rowToAdd)
			.then(() => {
				setRowToAdd(null);
				getTable();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function deleteTableRow(row: any) {
		if (!selectedTable || !selectedDatabase) return;
		console.log(row);

		DeleteTableRow(selectedDatabase.id, selectedTable.name, row)
			.then(() => {
				getTable();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function deleteDatabase() {
		if (!selectedDatabase) return;

		DeleteDatabase(selectedDatabase.id)
			.then(() => {
				setSelectedDatabase(null);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function isJsonString(str: string) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	if (!selectedDatabase || !selectedTable) return null;

	return (
		<div className="flex flex-col gap-4 items-start">
			<div className="flex items-center gap-2 border rounded-lg">
				<Avatar className="ml-4 h-5 w-5">
					<AvatarImage
						src={`https://avatar.vercel.sh/${selectedDatabase?.name}.png`}
						alt={selectedDatabase?.name}
					/>
				</Avatar>
				<h1 className="text-md font-normal">{selectedDatabase.name}</h1>
				<ConfirmDialog onConfirm={deleteDatabase}>
					<Button variant="ghost">
						<Trash2 size={12} />
					</Button>
				</ConfirmDialog>
			</div>
			<div className="flex items-center gap-4">
				<h1 className="text-3xl font-extrabold">
					{selectedTable.name}
				</h1>
				<ConfirmDialog onConfirm={removeTable}>
					<Button variant="ghost">
						<Trash2 size={20} />
					</Button>
				</ConfirmDialog>
			</div>
			<table className="w-full mt-4">
				<thead>
					<tr className="flex w-full">
						{table.columns.map((column, i) => (
							<th
								key={i}
								className="w-60 flex-1 p-2 border flex items-center gap-2"
							>
								<span>{column.name}</span>
								<span className="text-xs text-gray-400">
									({column.type})
								</span>
							</th>
						))}
						<th>
							<Button variant="ghost" className="ml-4">
								<Plus size={15} />
							</Button>
						</th>
					</tr>
				</thead>
				<tbody>
					{table.rows.map((row, i) => (
						<tr key={i} className="flex w-full">
							{Object.entries(row).map(([key, value], i) => (
								<td
									key={i}
									className="w-60 flex-1 p-2 border flex items-center gap-2"
								>
									<span>
										{isJsonString(value) ? (
											Array.isArray(JSON.parse(value)) ? (
												<ol>
													{JSON.parse(value).map(
														(
															item: any,
															index: number
														) => (
															<li
																key={index}
																className={`list-inside list-decimal ${
																	index > 0
																		? "border-t"
																		: ""
																}`}
															>
																{item}
															</li>
														)
													)}
												</ol>
											) : (
												JSON.parse(value)
											)
										) : (
											value
										)}
									</span>
								</td>
							))}
							<td>
								<ConfirmDialog
									onConfirm={() => deleteTableRow(row)}
								>
									<Button variant="ghost" className="ml-4">
										<Trash2 size={15} />
									</Button>
								</ConfirmDialog>
							</td>
						</tr>
					))}
					{rowToAdd && rowToAdd.length > 0 && (
						<tr className="flex w-full">
							{rowToAdd.map((column: any, i: number) => (
								<td
									key={i}
									className="w-60 flex-1 border flex items-center gap-2"
								>
									<input
										type="text"
										className="w-full p-2"
										placeholder={column.key}
										value={column.value}
										onChange={(e) =>
											setRowToAdd([
												...rowToAdd.slice(0, i),
												{
													...column,
													value: e.target.value,
												},
												...rowToAdd.slice(i + 1),
											])
										}
									/>
								</td>
							))}
							<td>
								<Button
									variant="ghost"
									onClick={addRow}
									className="ml-4"
								>
									<Check size={15} />
								</Button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<Button
				variant="default"
				onClick={() =>
					rowToAdd && rowToAdd.length > 0
						? setRowToAdd(null)
						: setRowToAdd(
								table.columns.map((column) => {
									return { key: column.name, value: "" };
								})
						  )
				}
			>
				{rowToAdd && rowToAdd.length > 0 ? "Cancel" : "Add Row"}
			</Button>
		</div>
	);
}
