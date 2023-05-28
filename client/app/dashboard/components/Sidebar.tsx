import { DatabaseProps } from "../DashboardContext";
import DatabaseSwitcher from "./DatabaseSwitcher";
import { useAuth } from "@/components/AuthContext";
import { Label } from "@/components/ui/label";
import { GetDatabase } from "@/utils/DataManager";
import { useEffect, useState } from "react";

export default function Sidebar() {
	const { user } = useAuth();
	const [databases, setDatabases] = useState<DatabaseProps[]>([]);

	useEffect(() => {
		GetDatabases();
	}, [user]);

	async function GetDatabases() {
		if (!user?.databases) return;
		const databaseIDs = JSON.parse(user.databases);

		const databases = await Promise.all(
			databaseIDs.map(async (id: string) => {
				return await GetDatabase(id)
					.then((res) => res)
					.catch(() => null);
			})
		).then((res) => {
			return res.filter((r) => r !== null);
		});

		setDatabases(databases);
	}

	return (
		<div className="h-full border-r p-4 flex flex-col gap-4">
			<DatabaseSwitcher databases={databases} />
			<Label>Tables</Label>
		</div>
	);
}
