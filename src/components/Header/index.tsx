"use client";

import { MenuIcon, Github, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { focusRing } from "./style";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import MagaLogo from "@/components/ui/logo";
import { usePathname } from "next/navigation";

export const Header = () => {
	const { scrolled } = useScrolled({ initial: false });

	return (
		<header
			className={cn(
				"sticky top-0 z-50 flex items-center justify-center h-14 rounded-md max-md:border-b max-md:bg-bg md:h-16",
				scrolled && "pointer-events-none",
			)}
		>
			<div className="container flex h-full max-w-screen-lg items-center">
				{/* Desktop Nav */}
				<div className="hidden w-full items-center justify-between md:flex">
					<div className="w-[130px]">
						<a
							href="/"
							className={cn(
								focusRing(),
								"flex items-center space-x-2 rounded opacity-100 transition-[opacity,transform] duration-300 ease-out",
								scrolled && "pointer-events-none -translate-x-2 opacity-0",
							)}
						>
							<MagaLogo width={35} height={35} />
							<div className="mt-1 font-josephin whitespace-nowrap font-catalina leading-normal tracking-tighter uppercase">
								MAGA
							</div>
						</a>
					</div>
					<div
						className={cn(
							"relative flex items-center gap-6 overflow-hidden rounded-md bg-transparent px-4 py-1 transition-[padding,background-color] duration-300 ease-out",
							scrolled &&
								"pointer-events-auto bg-bg-muted pl-14 shadow-lg bg-background/100",
						)}
					>
						<a
							href="/"
							className={cn(
								focusRing(),
								"pointer-events-none absolute -translate-x-14 rounded opacity-0 transition-[opacity,transform] duration-300 ease-out",
								scrolled && "-translate-x-10 opacity-100",
							)}
							tabIndex={scrolled ? undefined : -1}
						>
							<MagaLogo width={20} height={20} />
						</a>
						<Nav items={nav.links} />
						<a href="/auth">
							<Button size="sm">Get Started</Button>
						</a>
					</div>
					<div
						className={cn(
							"flex w-[130px] items-center justify-end space-x-2 opacity-100 transition-[opacity,transform] duration-300 ease-out",
							scrolled && "pointer-events-none translate-x-2 opacity-0",
						)}
						aria-hidden={scrolled}
						tabIndex={scrolled ? -1 : undefined}
					>
						<Button size="icon" aria-label="github">
							<Github />
						</Button>
						<Button size="icon" aria-label="twitter">
							<TwitterIcon />
						</Button>
						{/* <ThemeToggle /> Ficará aqui */}
					</div>
				</div>
				{/* Mobile nav */}
				<div className="mx-auto items-center flex w-full justify-between gap-4 md:hidden px-4">
					<a
						href="/"
						className={cn(
							focusRing(),
							"flex items-center justify-center space-x-2 rounded transition-opacity hover:opacity-80",
						)}
					>
						<MagaLogo width={35} height={35} />
						<div className="mt-1 font-bold leading-normal tracking-tighter">
							MAGA
						</div>
					</a>
					<div className="flex items-center justify-center space-x-4">
						<a href="/auth">
							<button
								type="button"
								className="group h-8 items-center flex gap-2 rounded-full bg-neutral-200 pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700"
							>
								<span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-white">
									<svg
										stroke="currentColor"
										fill="none"
										strokeWidth="2"
										viewBox="0 0 24 24"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45"
										height="1em"
										width="1em"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Arrow</title>
										<line x1="5" y1="12" x2="19" y2="12" />
										<polyline points="12 5 19 12 12 19" />
									</svg>
								</span>
								<span>Get Started</span>
							</button>
						</a>
						<Drawer>
							<DrawerTrigger asChild>
								<Button size="icon" aria-label="Open menu">
									<MenuIcon />
								</Button>
							</DrawerTrigger>
							<DrawerContent>
								<Nav
									direction="col"
									items={[{ label: "Home", href: "/" }, ...nav.links]}
								/>
							</DrawerContent>
						</Drawer>
					</div>
				</div>
			</div>
		</header>
	);
};

interface NavItem {
	label: string;
	href?: string;
}

interface NavProps {
	items: NavItem[];
	direction?: "col" | "row";
	onNavItemClick?: () => void;
}

const nav = {
	links: [
		{
			label: "Sobre",
			href: "#about",
		},
		{
			label: "Eventos",
			href: "#events",
		},
		{
			label: "Espaço",
			href: "/spacing",
		},
	],
};

const Nav = (props: NavProps) => {
	const { items, direction = "row", onNavItemClick } = props;
	const pathname = usePathname();

	return (
		<nav
			className={cn("flex items-center gap-0 sm:gap-2", {
				"flex-col gap-2": direction === "col",
			})}
		>
			{items.map(
				(item, index) =>
					item.href && (
						<a
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className={cn(
								focusRing(),
								"flex items-center justify-center gap-2 rounded px-4 py-1 text-sm font-medium text-text/90 transition-colors hover:text-accent-foreground ",
								pathname.startsWith(item.href) &&
									item.href !== "/" &&
									"bg-foreground/10 text-fg",
								direction === "col" && "text-md w-full py-2",
							)}
							href={item.href}
							onClick={onNavItemClick}
						>
							{item.href === "/" && <MagaLogo width={30} height={30} />}
							<span className="relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
								{item.label}
							</span>
						</a>
					),
			)}
		</nav>
	);
};
