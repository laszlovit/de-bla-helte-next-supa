import { eq } from "drizzle-orm";
import { db } from "../index";
import { InsertService, SelectServices, services } from "../schema";

export async function getAllServices(): Promise<SelectServices[]> {
	return db.select().from(services);
}

export async function getServiceById(id: SelectServices["id"]): Promise<SelectServices> {
	const result = await db.select().from(services).where(eq(services.id, id));
	return result[0];
}

export async function insertService(data: InsertService) {
	await db.insert(services).values(data);
}

export async function deleteService(id: SelectServices["id"]) {
	await db.delete(services).where(eq(services.id, id));
}
