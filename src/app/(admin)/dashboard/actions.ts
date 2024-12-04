"use server";

import { createClient } from "@/utils/supabase/server";

export async function logOut() {
	const supabase = await createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error(error);
		return;
	}
}
