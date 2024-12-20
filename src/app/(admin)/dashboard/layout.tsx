import type { Metadata } from "next";

import { ApplicationLayout } from "@/app/application-layout";
import "@/app/globals.css";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<html
			lang="en"
			className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
		>
			<head>
				<link rel="preconnect" href="https://rsms.me/" />
				<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
			</head>
			<body>
				<ApplicationLayout currentUserEmail={user?.email}>{children}</ApplicationLayout>
			</body>
		</html>
	);
}
