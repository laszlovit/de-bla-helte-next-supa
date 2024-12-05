export function getImageUrl(path: string): string {
	return `${process.env.NEXT_PUBLIC_STORAGE_BUCKET_URL}/${path}`;
}
