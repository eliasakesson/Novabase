import { createContext, useContext, useState } from "react";

const DashboardContext = createContext({
	database: null as DatabaseProps | null,
	setDatabase: (database: DatabaseProps | null) => {},
});

export const DashboardProvider = ({ children }: any) => {
	const [database, setDatabase] = useState<DatabaseProps | null>(null);

	return (
		<DashboardContext.Provider value={{ database, setDatabase }}>
			{children}
		</DashboardContext.Provider>
	);
};

export const useDashboard = () => {
	return useContext(DashboardContext);
};

export interface DatabaseProps {
	id: string;
	name: string;
	tables: TableProps[];
}

interface TableProps {
	id: string;
	name: string;
	columns: ColumnProps[];
}

interface ColumnProps {
	id: string;
	name: string;
	type: string;
}
