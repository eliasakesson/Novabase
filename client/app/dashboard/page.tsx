"use client";

import { DashboardProvider } from "./DashboardContext";
import Table from "./components/main/Table";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			// router.push("/login");
		}
	}, [user]);

	return (
		<DashboardProvider>
			<div className="flex h-[calc(100vh-65px)]">
				<Sidebar />
				<div className="flex flex-col gap-4 p-16">
					<h1 className="text-3xl font-extrabold">Dashboard</h1>
					<Table />
				</div>
			</div>
		</DashboardProvider>
	);
}
