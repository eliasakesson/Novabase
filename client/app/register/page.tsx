import { UserAuthForm } from "./components/UserAuthForm";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Command } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication forms built using the components.",
};

export default function RegisterPage() {
	return (
		<div className="container fixed top-0 left-0 z-50 h-screen bg-white flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="absolute right-8 top-8 flex gap-4">
				<Link
					href={`/login`}
					className={buttonVariants({
						variant: "outline",
						size: "sm",
					})}
				>
					Login
				</Link>
				<Link
					href="/"
					className={buttonVariants({
						variant: "ghost",
						size: "sm",
					})}
				>
					Back to home
				</Link>
			</div>
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<div
					className="absolute inset-0 bg-cover"
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1684814833784-c9c8cdba1d20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80)",
					}}
				/>
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Command className="mr-2 h-6 w-6" /> {siteConfig.name}
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;This library has saved me countless hours of
							work and helped me deliver stunning designs to my
							clients faster than ever before. Highly
							recommended!&rdquo;
						</p>
						<footer className="text-sm">Sofia Davis</footer>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Create an account
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email below to create your account
						</p>
					</div>
					<UserAuthForm />
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>
						{" and "}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
