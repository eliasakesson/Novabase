import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function IndexPage() {
	return (
		<section className="container h-[60vh] flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
			<div className="w-[980px] max-w-[100%] flex flex-col items-start gap-2">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
					Lagra data snabbt, <br className="hidden sm:inline" />
					smidigt och billigt.
				</h1>
				<p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
					En databas som är säker, snabb och enkel att använda.
				</p>
			</div>
			<div className="w-[980px] max-w-[100%] flex gap-4">
				<Link
					href="/register"
					className={buttonVariants({ size: "lg" })}>
					Get Started
				</Link>
				<Link
					href="/login"
					className={buttonVariants({
						variant: "outline",
						size: "lg",
					})}>
					Login
				</Link>
			</div>
		</section>
	);
}
