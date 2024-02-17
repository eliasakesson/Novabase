import { createContext, useContext, useState } from "react";

const DashboardContext = createContext({
	selectedDatabase: null as DatabaseProps | null,
	setSelectedDatabase: (database: DatabaseProps | null) => {},
	selectedTable: null as TableProps | null,
	setSelectedTable: (table: TableProps | null) => {},
});

export const DashboardProvider = ({ children }: any) => {
	const [selectedDatabase, setSelectedDatabase] =
		useState<DatabaseProps | null>(null);

	const [selectedTable, setSelectedTable] = useState<TableProps | null>(null);

	return (
		<DashboardContext.Provider
			value={{
				selectedDatabase,
				setSelectedDatabase,
				selectedTable,
				setSelectedTable,
			}}
		>
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
	ownerUID: string;
}

interface TableProps {
	id: string;
	name: string;
	columns: ColumnProps[];
}

interface ColumnProps {
	id: string;
	key: string;
	type: string;
}
