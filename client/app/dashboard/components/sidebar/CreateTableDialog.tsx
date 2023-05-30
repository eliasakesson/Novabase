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

export default function CreateTableDialog() {
	const [open, setOpen] = useState(false);
	const [tableName, setTableName] = useState("");
	const { user } = useAuth();
	const { selectedDatabase } = useDashboard();

	function createTable() {
		if (!user) return console.error("User is not logged in.");
		if (!selectedDatabase) return console.error("No database selected.");

		if (tableName.length < 3)
			return console.error("Name must be at least 3 characters long.");

		CreateTable(selectedDatabase.id, tableName, [
			{ key: "name", type: "TEXT" },
		])
			.then((data) => {
				console.log(data);
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
					<div className="space-y-4 py-2 pb-4">
						<div className="space-y-2">
							<Label htmlFor="name">Table name</Label>
							<Input
								id="name"
								placeholder="Acme Inc."
								value={tableName}
								onChange={(e) => setTableName(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">Key</Label>
								<Input
									id="name"
									placeholder="Acme Inc."
									value={tableName}
									onChange={(e) =>
										setTableName(e.target.value)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="name">Data type</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select a fruit" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Fruits</SelectLabel>
											<SelectItem value="apple">
												Apple
											</SelectItem>
											<SelectItem value="banana">
												Banana
											</SelectItem>
											<SelectItem value="blueberry">
												Blueberry
											</SelectItem>
											<SelectItem value="grapes">
												Grapes
											</SelectItem>
											<SelectItem value="pineapple">
												Pineapple
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
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
