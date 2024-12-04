"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "./actions";

export default function AuthForm() {
	async function submit(form: FormData) {
		await login(form);
		redirect("/dashboard");
	}

	return (
		<>
			<form action={submit} className="p-7 sm:p-11">
				<div className="flex items-start">
					<Link title="Home" data-headlessui-state="" href="/">
						<p className="text-xl font-semibold text-primary">De Blå Helte</p>
					</Link>
				</div>
				<h1 className="mt-8 text-base/6 font-medium">Welcome back!</h1>
				<p className="mt-1 text-sm/5 text-gray-600">Sign in to your account to continue.</p>
				<div className="mt-8 space-y-3">
					<label className="text-sm/5 font-medium">Email</label>
					<input
						type="email"
						name="email"
						className="block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6 data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black"
					/>
				</div>
				<div className="mt-8 space-y-3">
					<label className="text-sm/5 font-medium">Password</label>
					<input
						type="password"
						name="password"
						className="block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6 data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black"
					/>
				</div>
				<div className="mt-8">
					<button
						type="submit"
						className="w-full inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
						data-headlessui-state=""
					>
						Sign in
					</button>
				</div>
			</form>
		</>
	);
}
