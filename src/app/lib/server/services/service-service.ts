"use server";

import { deleteService, getServiceById, insertService } from "@/db/queries/services";
import { InsertService } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { uploadFile } from "@/utils/supabase/storage/actions";
import { revalidatePath } from "next/cache";

export async function insertServiceFormAction(form: FormData) {
	const iconFile = form.get("icon") as File;
	const mainImageFile = form.get("mainImage") as File;

	const iconFormData = new FormData();
	iconFormData.append("file", iconFile);

	const mainImageFormData = new FormData();
	mainImageFormData.append("file", mainImageFile);

	const iconUploadResult = await uploadFile(iconFormData, "services");
	const mainImageUploadResult = await uploadFile(mainImageFormData, "services");

	if (iconUploadResult.error) {
		throw new Error(iconUploadResult.error);
	}

	if (mainImageUploadResult.error) {
		throw new Error(mainImageUploadResult.error);
	}

	const serviceData: InsertService = {
		title: form.get("title") as string,
		content: form.get("content") as string,
		icon: iconUploadResult.data?.path || "",
		mainImage: mainImageUploadResult.data?.path || "",
	};

	await insertService(serviceData);
	revalidatePath("/dashboard/services");
}

export async function deleteServiceFormAction(id: number) {
	const supabase = await createClient();

	const service = await getServiceById(id);

	if (!service) {
		throw new Error("Service not found");
	}

	// Delete the icon and mainImage files from the storage bucket
	const { error: iconError } = await supabase.storage.from("media").remove([service.icon]);
	const { error: mainImageError } = await supabase.storage
		.from("media")
		.remove([service.mainImage]);

	if (iconError) {
		throw new Error(`Failed to delete icon: ${iconError.message}`);
	}

	if (mainImageError) {
		throw new Error(`Failed to delete main image: ${mainImageError.message}`);
	}

	await deleteService(id);
	revalidatePath("/dashboard/services");
}
