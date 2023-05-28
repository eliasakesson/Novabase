"use client";

import { DashboardProvider } from "./DashboardContext";
import Sidebar from "./components/Sidebar";
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
			<div className="flex">
				<Sidebar />
				<h1>Dashboard</h1>
			</div>
		</DashboardProvider>
	);
}
