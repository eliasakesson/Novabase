"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext({
	user: null as UserProps | null,
	setUser: (user: UserProps | null) => {},
	updateUser: () => {},
});

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<UserProps | null>(null);

	useEffect(() => {
		updateUser();
	}, []);

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", user.uid);
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	function updateUser() {
		const uid = localStorage.getItem("user");
		if (uid) {
			getUser(uid).then((user) => {
				if (user) {
					setUser(user);
				}
			});
		}
	}

	return (
		<AuthContext.Provider value={{ user, setUser, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};

async function getUser(uid: string) {
	try {
		const res = await fetch(`http://localhost:8080/v1/auth/users/${uid}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		if (data.ok) {
			return data.body;
		} else {
			return null;
		}
	} catch (err: any) {
		return null;
	}
}

export const useAuth = () => {
	return useContext(AuthContext);
};

interface UserProps {
	username: string;
	email: string;
	uid: string;
	databases: string;
}
