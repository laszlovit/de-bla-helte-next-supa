"use client";

import { deleteServiceFormAction } from "@/app/lib/server/services/service-service";

export const DeleteServiceForm = ({ id, children }: { id: number; children: React.ReactNode }) => {
	async function submit() {
		const formData = new FormData();
		formData.append("id", id.toString());
		await deleteServiceFormAction(formData);
	}

	return (
		<form
			action={submit}
			className="flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto"
		>
			{children}
		</form>
	);
};
