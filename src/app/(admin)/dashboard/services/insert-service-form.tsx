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

import { insertServiceFormAction } from "@/app/lib/server/services/service-service";
import { Editor } from "@/components/dynamic-editor";

export default function InsertServiceForm() {
	// eslint-disable-next-line prefer-const
	let [isOpen, setIsOpen] = useState(false);
	const [editorContent, setEditorContent] = useState("");

	async function submit(form: FormData) {
		form.set("content", editorContent);
		await insertServiceFormAction(form);
	}

	return (
		<>
			<Button type="button" onClick={() => setIsOpen(true)}>
				Create service
			</Button>
			<Dialog open={isOpen} onClose={setIsOpen} size="4xl">
				<form action={submit}>
					<DialogTitle>Create service</DialogTitle>
					<DialogDescription>
						Enter the service&apos;s title and content to create a new service.
					</DialogDescription>
					<DialogBody>
						<Fieldset>
							<FieldGroup>
								<Field>
									<Label>Title</Label>
									<Input name="title" type="string" required />
								</Field>
								<Field>
									<Label>Content</Label>
									<Input
										name="content"
										type="text"
										required
										className="hidden"
										value={editorContent}
										readOnly
									/>
									<Editor onChange={(value) => setEditorContent(value)} />
								</Field>
								<Field>
									<Label>Icon</Label>
									<Input name="icon" type="file" required />
								</Field>
								<Field>
									<Label>Main image</Label>
									<Input name="mainImage" type="file" required />
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
