import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Input, InputGroup } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getAllServices } from "@/db/queries/services";
import { getImageUrl } from "@/utils/supabase/storage/url";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Metadata } from "next";
import Link from "next/link";
import InsertServiceForm from "./insert-service-form";
import ServicesTableDropdown from "./services-table-dropdown";

export const metadata: Metadata = {
	title: "Services | Dashboard",
};

export default async function DashboardServicesPage() {
	const services = await getAllServices();

	return (
		<>
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div className="max-sm:w-full sm:flex-1">
					<Heading>Services</Heading>
					<div className="mt-4 flex max-w-xl gap-4">
						<div className="flex-1">
							<InputGroup>
								<MagnifyingGlassIcon />
								<Input name="search" placeholder="Search services&hellip;" />
							</InputGroup>
						</div>
						<div>
							<Select name="sort_by">
								<option value="name">Sort by name</option>
								<option value="date">Sort by date</option>
								<option value="status">Sort by status</option>
							</Select>
						</div>
					</div>
				</div>
				<InsertServiceForm />
			</div>
			<ul className="mt-10">
				{services.map((service, index) => (
					<li key={service.title}>
						<Divider soft={index > 0} />
						<div className="flex items-center justify-between">
							<div key={service.title} className="flex gap-6 py-6">
								<div className="w-32 shrink-0">
									<Link href="#" aria-hidden="true">
										<img
											src={getImageUrl(service.icon)}
											alt=""
											className="aspect-[3/2] bg-gray-50 rounded-lg shadow"
										/>
									</Link>
								</div>
								<div className="space-y-1.5">
									<div className="text-base/6 font-semibold">
										<Link href="">{service.title}</Link>
									</div>
									<div className="text-xs/6 text-zinc-500">{service.content}</div>
								</div>
							</div>
							<div className="flex items-center gap-4">
								{/* <Badge
										className="max-sm:hidden"
										color={event.status === "On Sale" ? "lime" : "zinc"}
									>
										{event.status}
									</Badge>
                                    */}
								<ServicesTableDropdown id={service.id} />
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
