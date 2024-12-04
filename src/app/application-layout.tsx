"use client";

import { Avatar } from "@/components/ui/avatar";
import {
	Dropdown,
	DropdownButton,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownMenu,
} from "@/components/ui/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/ui/navbar";
import {
	Sidebar,
	SidebarBody,
	SidebarFooter,
	SidebarHeader,
	SidebarHeading,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
	SidebarSpacer,
} from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/ui/sidebar-layout";
import {
	ArrowRightStartOnRectangleIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	Cog8ToothIcon,
	LightBulbIcon,
	PlusIcon,
	ShieldCheckIcon,
	UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
	Cog6ToothIcon,
	HomeIcon,
	QuestionMarkCircleIcon,
	SparklesIcon,
	UsersIcon,
	WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "./(admin)/dashboard/actions";

function AccountDropdownMenu({ anchor }: { anchor: "top start" | "bottom end" }) {
	const router = useRouter();

	async function handleSignOut() {
		await logOut();
		router.push("/login");
	}

	return (
		<DropdownMenu className="min-w-64" anchor={anchor}>
			<DropdownItem href="#">
				<UserCircleIcon />
				<DropdownLabel>My account</DropdownLabel>
			</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="#">
				<ShieldCheckIcon />
				<DropdownLabel>Privacy policy</DropdownLabel>
			</DropdownItem>
			<DropdownItem href="#">
				<LightBulbIcon />
				<DropdownLabel>Share feedback</DropdownLabel>
			</DropdownItem>
			<DropdownDivider />
			<DropdownItem onClick={() => handleSignOut()}>
				<ArrowRightStartOnRectangleIcon />
				<DropdownLabel className="">Sign out</DropdownLabel>
			</DropdownItem>
		</DropdownMenu>
	);
}

export function ApplicationLayout({
	children,
	currentUserName,
	currentUserEmail,
}: {
	children: React.ReactNode;
	currentUserName?: string;
	currentUserEmail?: string;
}) {
	// eslint-disable-next-line prefer-const
	let pathname = usePathname();

	return (
		<SidebarLayout
			navbar={
				<Navbar>
					<NavbarSpacer />
					<NavbarSection>
						<Dropdown>
							<DropdownButton as={NavbarItem}>
								<Avatar src="/users/erica.jpg" square />
							</DropdownButton>
							<AccountDropdownMenu anchor="bottom end" />
						</Dropdown>
					</NavbarSection>
				</Navbar>
			}
			sidebar={
				<Sidebar>
					<SidebarHeader>
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<Avatar src="/teams/catalyst.svg" />
								<SidebarLabel>Catalyst</SidebarLabel>
								<ChevronDownIcon />
							</DropdownButton>
							<DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
								<DropdownItem href="/settings">
									<Cog8ToothIcon />
									<DropdownLabel>Settings</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="#">
									<Avatar slot="icon" src="/teams/catalyst.svg" />
									<DropdownLabel>Catalyst</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="#">
									<Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
									<DropdownLabel>Big Events</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="#">
									<PlusIcon />
									<DropdownLabel>New team&hellip;</DropdownLabel>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</SidebarHeader>

					<SidebarBody>
						<SidebarSection>
							<SidebarItem href="/dashboard" current={pathname === "/dashboard"}>
								<HomeIcon />
								<SidebarLabel>Dashboard</SidebarLabel>
							</SidebarItem>
							<SidebarItem
								href="/dashboard/services"
								current={pathname.startsWith("/dashboard/services")}
							>
								<WrenchScrewdriverIcon />
								<SidebarLabel>Services</SidebarLabel>
							</SidebarItem>
							<SidebarItem
								href="/dashboard/users"
								current={pathname.startsWith("/dashboard/users")}
							>
								<UsersIcon />
								<SidebarLabel>Users</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/settings" current={pathname.startsWith("/settings")}>
								<Cog6ToothIcon />
								<SidebarLabel>Settings</SidebarLabel>
							</SidebarItem>
						</SidebarSection>

						<SidebarSection className="max-lg:hidden">
							<SidebarHeading>Upcoming Events</SidebarHeading>
						</SidebarSection>

						<SidebarSpacer />

						<SidebarSection>
							<SidebarItem href="#">
								<QuestionMarkCircleIcon />
								<SidebarLabel>Support</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="#">
								<SparklesIcon />
								<SidebarLabel>Changelog</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
					</SidebarBody>

					<SidebarFooter className="max-lg:hidden">
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<span className="flex min-w-0 items-center gap-3">
									<span className="min-w-0">
										<span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
											{currentUserName}
										</span>
										<span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
											{currentUserEmail}
										</span>
									</span>
								</span>
								<ChevronUpIcon />
							</DropdownButton>
							<AccountDropdownMenu anchor="top start" />
						</Dropdown>
					</SidebarFooter>
				</Sidebar>
			}
		>
			{children}
		</SidebarLayout>
	);
}
