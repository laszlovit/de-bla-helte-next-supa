"use server";

import { createClient } from "@/utils/supabase/server";
import { v4 as uuid } from "uuid";

const storageBucket = "media";

export const uploadFile = async (formData: FormData, folder: string) => {
	const supabase = await createClient();
	const user = (await supabase.auth.getUser()).data.user;

	if (!user) {
		return {
			error: "You must be logged in to upload a file",
		};
	}

	const file = formData.get("file") as File;

	const path = `${folder}/${file.name}.${uuid()}`;

	const { data, error } = await supabase.storage.from(storageBucket).upload(path, file);

	return { data, error: error?.message };
};
