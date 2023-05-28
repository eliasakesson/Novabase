"use client";

import { useAuth } from "@/components/AuthContext";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Login } from "@/utils/AuthManager";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const { setUser } = useAuth();
	const router = useRouter();

	const [input, setInput] = useState<{
		email: string;
		password: string;
	}>({ email: "", password: "" });
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [status, setStatus] = useState<{
		type: "success" | "error" | null;
		text: string;
	}>({ type: null, text: "" });

	function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		Login(input.email, input.password)
			.then((data: any) => {
				setUser(data);
				setStatus({
					type: "success",
					text: "Login successfull! Redirecting...",
				});
				setTimeout(() => {
					router.push("/dashboard");
				}, 1000);
			})
			.catch((err) => {
				setStatus({ type: "error", text: err });
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			{status.type && (
				<div
					className={`p-4 text-center text-sm rounded ${
						status.type === "success"
							? "bg-green-100 text-green-500"
							: "bg-red-100 text-red-500"
					}`}
				>
					<p>{status.text}</p>
				</div>
			)}
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							value={input.email}
							onChange={(e) =>
								setInput({ ...input, email: e.target.value })
							}
							disabled={isLoading}
							required
						/>
					</div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							autoCapitalize="none"
							autoComplete="current-password"
							autoCorrect="off"
							value={input.password}
							onChange={(e) =>
								setInput({ ...input, password: e.target.value })
							}
							disabled={isLoading}
							required
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Sign In with Email
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{" "}
				Github
			</Button>
		</div>
	);
}
