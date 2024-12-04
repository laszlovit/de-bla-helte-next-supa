import { Suspense } from "react";
import AuthForm from "./auth-form";

export default function LoginPage() {
	return (
		<main className=" bg-gray-50">
			<div className=" flex min-h-dvh items-center justify-center p-6 lg:p-8">
				<div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
					<Suspense>
						<AuthForm />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
