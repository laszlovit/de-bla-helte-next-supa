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

export async function deleteServiceFormAction(form: FormData) {
	const id = Number(form.get("id"));

	if (!isNaN(id)) {
		await deleteService(id);
	} else {
		throw new Error("Invalid ID");
	}

	revalidatePath("/dashboard/services");
	return [];
}
