import { atom, useAtom } from "jotai";

export type Toast = {
	id: string;
	type: "success" | "error" | "warning" | "info";
	title: string;
	description: string;
	duration: number;
	action?: { label: string; onClick: () => void };
};

const toastsStore = atom<Toast[]>([]);

export const useToast = () => {
	const [toasts, setToasts] = useAtom(toastsStore);
	function showToast(toast: Toast): void {
		setToasts([...toasts, toast]);
		setTimeout(() => {
			setToasts((toasts) => toasts.filter((t) => t.id !== toast.id));
		}, toast.duration);
	}

	const toast: {
		success: (title: string, description: string) => void;
		error: (title: string, description: string) => void;
		warning: (title: string, description: string) => void;
		info: (title: string, description: string) => void;
	} = {
		success: (title, description) =>
			showToast({
				id: Symbol().toString(),
				title,
				description,
				type: "success",
				duration: 5000,
			}),
		error: (title, description) =>
			showToast({
				id: Symbol().toString(),
				title,
				description,
				type: "error",
				duration: 8000,
			}),
		warning: (title, description) =>
			showToast({
				id: Symbol().toString(),
				title,
				description,
				type: "warning",
				duration: 5000,
			}),
		info: (title, description) =>
			showToast({
				id: Symbol().toString(),
				title,
				description,
				type: "info",
				duration: 5000,
			}),
	};

	return { toasts, toast, showToast, setToasts };
};
