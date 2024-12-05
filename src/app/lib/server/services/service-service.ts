"use server";

import { deleteService, insertService } from "@/db/queries/services";
import { InsertService } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function insertServiceForm(form: FormData) {
	const serviceData: InsertService = {
		title: form.get("name") as string,
		content: form.get("content") as string,
	};

	await insertService(serviceData);
	revalidatePath("/dashboard/services");
}

export async function deleteServiceFormAction(id: number) {
	await deleteService(id);
	revalidatePath("/dashboard/services");
}
