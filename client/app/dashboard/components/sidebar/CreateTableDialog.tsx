import { useDashboard } from "../../DashboardContext";
import { useAuth } from "@/components/AuthContext";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CreateTable } from "@/utils/DataManager";
import { useState } from "react";

interface ColumnProps {
	key: string;
	type: string;
}

export default function CreateTableDialog() {
	const [open, setOpen] = useState(false);
	const { user } = useAuth();
	const { selectedDatabase, setSelectedTable } = useDashboard();

	const [tableName, setTableName] = useState("");
	const [columns, setColumns] = useState<ColumnProps[]>([
		{ key: "", type: "TEXT" },
	]);

	function createTable() {
		if (!user) return console.error("User is not logged in.");
		if (!selectedDatabase) return console.error("No database selected.");

		if (tableName.length < 3)
			return console.error("Name must be at least 3 characters long.");

		CreateTable(selectedDatabase.id, tableName, columns)
			.then((data: any) => {
				setSelectedTable(data);
				setOpen(false);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	if (!selectedDatabase) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default">Add Table</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Table</DialogTitle>
					<DialogDescription>
						Add a new table to your database.
					</DialogDescription>
				</DialogHeader>
				<div>
					<div className="py-2 pb-4">
						<div className="space-y-2">
							<Label htmlFor="name">Table name</Label>
							<Input
								id="name"
								placeholder="Acme Inc."
								value={tableName}
								onChange={(e) => setTableName(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4 mt-4">
							<h3 className="text-sm font-medium">Keys</h3>
							<h3 className="text-sm font-medium">Data types</h3>
						</div>
						<div className="flex flex-col gap-2">
							{columns.map((column, i) => (
								<TableField
									column={column}
									setColumn={(column: any) =>
										setColumns(
											columns.map((c, j) =>
												i === j ? column : c
											)
										)
									}
									key={i}
								/>
							))}
						</div>
						<div className="flex justify-end mt-4">
							<Button
								variant="ghost"
								onClick={() =>
									setColumns((columns) => [
										...columns,
										{ key: "", type: "text" },
									])
								}
							>
								Add column
							</Button>
							<Button
								variant="ghost"
								onClick={() =>
									setColumns((columns) =>
										columns.slice(0, -1)
									)
								}
							>
								Remove column
							</Button>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={createTable}>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function TableField({
	column,
	setColumn,
}: {
	column: ColumnProps;
	setColumn: (column: ColumnProps) => void;
}) {
	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="space-y-2">
				<Label className="sr-only" htmlFor="name">
					Key
				</Label>
				<Input
					id="name"
					placeholder="Acme Inc."
					value={column.key}
					onChange={(e) =>
						setColumn({ ...column, key: e.target.value })
					}
				/>
			</div>
			<div className="space-y-2">
				<Label className="sr-only" htmlFor="name">
					Data type
				</Label>
				<Select
					value={column.type}
					onValueChange={(value) =>
						setColumn({ ...column, type: value })
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="TEXT">TEXT</SelectItem>
							<SelectItem value="INTEGER">INTEGER</SelectItem>
							<SelectItem value="REAL">FLOAT</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
