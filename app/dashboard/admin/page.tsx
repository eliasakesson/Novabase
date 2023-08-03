"use client";

import { DashboardProvider, useDashboard } from "../DashboardContext";
import Table from "../components/main/Table";
import Sidebar from "../components/sidebar/Sidebar";
import { GetUsers } from "@/utils/AuthManager";
import { useEffect } from "react";

export default function AdminPage() {
	return (
		<DashboardProvider>
			<div className="flex h-[calc(100vh-65px)]">
				<Sidebar />
				<UsersTable />
			</div>
		</DashboardProvider>
	);
}

function UsersTable() {
	const { setSelectedDatabase, setSelectedTable } = useDashboard();

	useEffect(() => {
		setSelectedDatabase({
			id: "admin",
			name: "Admin",
			ownerUID: "",
		});
		setSelectedTable({
			name: "Users",
			id: "users",
			columns: [],
		});
	}, []);

	return (
		<div className="flex flex-col gap-4 p-16">
			<Table />
		</div>
	);
}
