"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogActions,
	DialogBody,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { insertServiceForm } from "@/app/lib/server/services/service-service";

export default function InsertServiceForm() {
	// eslint-disable-next-line prefer-const
	let [isOpen, setIsOpen] = useState(false);

	async function submit(form: FormData) {
		await insertServiceForm(form);
	}

	return (
		<>
			<Button type="button" onClick={() => setIsOpen(true)}>
				Create service
			</Button>
			<Dialog open={isOpen} onClose={setIsOpen}>
				<form action={submit}>
					<DialogTitle>Create service</DialogTitle>
					<DialogDescription>
						Enter the service&apos;s name and content to create a new service.
					</DialogDescription>
					<DialogBody>
						<Fieldset>
							<FieldGroup>
								<Field>
									<Label>Name</Label>
									<Input name="name" type="string" required />
								</Field>
								<Field>
									<Label>Content</Label>
									<Input name="content" type="text" required />
								</Field>
							</FieldGroup>
						</Fieldset>
					</DialogBody>
					<DialogActions>
						<Button plain onClick={() => setIsOpen(false)}>
							Cancel
						</Button>
						<Button onClick={() => setIsOpen(false)} type="submit">
							Create
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
}
