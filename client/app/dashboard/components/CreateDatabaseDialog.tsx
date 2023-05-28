import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateDatabase } from "@/utils/DataManager";
import { useState } from "react";

export default function CreateDatabaseDialog({
	open,
	onOpenChange,
	children,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}) {
	const [name, setName] = useState("");
	const { user, updateUser } = useAuth();

	function createDatabase() {
		if (!user) return console.error("User is not logged in.");

		if (name.length < 3)
			return console.error("Name must be at least 3 characters long.");

		CreateDatabase(name, user.uid)
			.then(() => {
				updateUser();
				onOpenChange(false);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{children}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Database</DialogTitle>
					<DialogDescription>
						Add a new database to your account.
					</DialogDescription>
				</DialogHeader>
				<div>
					<div className="space-y-4 py-2 pb-4">
						<div className="space-y-2">
							<Label htmlFor="name">Database name</Label>
							<Input
								id="name"
								placeholder="Acme Inc."
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button onClick={createDatabase}>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
