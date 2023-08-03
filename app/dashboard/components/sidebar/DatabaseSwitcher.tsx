"use client";

import { DatabaseProps, useDashboard } from "../../DashboardContext";
import CreateDatabaseDialog from "./CreateDatabaseDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { DialogTrigger } from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

interface DatabaseSwitcherProps extends PopoverTriggerProps {}

export default function DatabaseSwitcher({
	className,
	databases,
}: DatabaseSwitcherProps & { databases: DatabaseProps[] }) {
	const [open, setOpen] = useState(false);
	const [showNewDatabaseDialog, setShowNewDatabaseDialog] = useState(false);
	const { selectedDatabase, setSelectedDatabase, setSelectedTable } =
		useDashboard();

	useEffect(() => {
		if (databases.length > 0 && !selectedDatabase) {
			const selectedDatabaseName =
				localStorage.getItem("selectedDatabase");

			if (selectedDatabaseName) {
				const selectedDatabase = databases.find(
					(database) => database.name === selectedDatabaseName
				);

				if (selectedDatabase) {
					setSelectedDatabase(selectedDatabase);
					return;
				}
			}

			setSelectedDatabase(databases[0]);
		}
	}, [databases]);

	function SelectDatabase(database: DatabaseProps) {
		setSelectedTable(null);
		setSelectedDatabase(database);
		setOpen(false);

		localStorage.setItem("selectedDatabase", database.name);
	}

	return (
		<CreateDatabaseDialog
			open={showNewDatabaseDialog}
			onOpenChange={setShowNewDatabaseDialog}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						role="combobox"
						aria-expanded={open}
						aria-label="Select a Database"
						className={cn("w-[200px] justify-between", className)}>
						<Avatar className="mr-2 h-5 w-5">
							<AvatarImage
								src={`https://avatar.vercel.sh/${selectedDatabase?.name}.png`}
								alt={selectedDatabase?.name}
							/>
						</Avatar>
						{selectedDatabase?.name}
						<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandList>
							<CommandInput placeholder="Search Database..." />
							<CommandEmpty>No Database found.</CommandEmpty>
							<CommandGroup heading="Databases">
								{databases.map((database) => (
									<CommandItem
										key={database.name}
										onSelect={() =>
											SelectDatabase(database)
										}
										className="text-sm">
										<Avatar className="mr-2 h-5 w-5">
											<AvatarImage
												src={`https://avatar.vercel.sh/${database.name}.png`}
												alt={database.name}
											/>
											<AvatarFallback>SC</AvatarFallback>
										</Avatar>
										{database.name}
										<Check
											className={cn(
												"ml-auto h-4 w-4",
												selectedDatabase?.name ===
													database.name
													? "opacity-100"
													: "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											setOpen(false);
											setShowNewDatabaseDialog(true);
										}}>
										<PlusCircle className="mr-2 h-5 w-5" />
										Create Database
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</CreateDatabaseDialog>
	);
}
