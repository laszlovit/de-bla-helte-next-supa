"use client";

import { Alert, AlertActions, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/ui/dropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { DeleteServiceForm } from "./delete-service-form";

export default function ServicesTableDropdown({ id }: { id: number }) {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	return (
		<>
			<Dropdown>
				<DropdownButton plain aria-label="More options">
					<EllipsisVerticalIcon />
				</DropdownButton>
				<DropdownMenu anchor="bottom end">
					<DropdownItem onClick={() => setIsDeleteOpen(true)}>Delete</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Alert open={isDeleteOpen} onClose={setIsDeleteOpen}>
				<AlertTitle>Are you sure you want to delete this user?</AlertTitle>
				<AlertDescription>
					This is a permanent action and cannot be undone. Please be sure before proceeding.
				</AlertDescription>
				<AlertActions>
					<DeleteServiceForm id={id}>
						<Button plain onClick={() => setIsDeleteOpen(false)}>
							Cancel
						</Button>
						<Button type="submit" onClick={() => setIsDeleteOpen(false)} color="red">
							Delete
						</Button>
					</DeleteServiceForm>
				</AlertActions>
			</Alert>
		</>
	);
}
