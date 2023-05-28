"use client";

import { useAuth } from "./AuthContext";
import { UserNav } from "./UserNav";
import { MainNav } from "@/components/MainNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
	const { user } = useAuth();
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav items={siteConfig.mainNav} />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1 gap-4">
						{user ? (
							<>
								{pathname !== "/dashboard" && (
									<Link
										href="/dashboard"
										className={buttonVariants({
											size: "sm",
											variant: "ghost",
										})}
									>
										Go to Dashboard
									</Link>
								)}
								<UserNav />
							</>
						) : (
							<>
								<Link
									href="/register"
									className={buttonVariants({ size: "lg" })}
								>
									Get Started
								</Link>
								<Link
									href="/login"
									className={buttonVariants({
										variant: "outline",
										size: "lg",
									})}
								>
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}

{
	/* <Link
	href={siteConfig.links.github}
	target="_blank"
	rel="noreferrer"
>
	<div
		className={buttonVariants({
			size: "sm",
			variant: "ghost",
		})}
	>
		<Icons.gitHub className="h-5 w-5" />
		<span className="sr-only">GitHub</span>
	</div>
</Link>
<ThemeToggle /> */
}
