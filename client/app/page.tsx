import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function IndexPage() {
	return (
		<section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
			<div className="flex max-w-[980px] flex-col items-start gap-2">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
					Välkommen till{" "}
					<br className="hidden sm:inline" />
					framtidens databas.
				</h1>
				<p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
					En databas som är säker, snabb och enkel att använda. 
				</p>
			</div>
			<div className="flex gap-4">
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
			</div>
		</section>
	);
}
