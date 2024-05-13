'use client';
import Link from 'next/link';
import Image from 'next/image';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Sidebar = ({ user }: SiderbarProps) => {
	const pathname = usePathname();

	return (
		<section className="sidebar">
			<nav className="flex flex-col gap-4">
				<Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
					<Image
						src="/icons/logo.svg"
						width={40}
						height={40}
						alt="dalmabank logo"
						className="size-[24px] max-xl:size-14"
					/>
					<h1 className="sidebar-logo">DalmaBank</h1>
				</Link>

				{sidebarLinks.map((item) => {
					// Let us know which route is active using pathname
					const isActive =
						pathname === item.route || pathname.startsWith(`${item.route}/`);
					return (
						// Apply the bg-bank-gradient only if the isActive is true
						<Link
							className={cn('sidebar-link', {
								'bg-bank-gradient': isActive,
							})}
							href={item.route}
							key={item.label}
						>
							<div className="relative size-6">
								<Image
									src={item.imgURL}
									alt={item.label}
									fill
									className={cn({
										'brightness-[3] invert-0': isActive,
									})}
								/>
							</div>
							<p
								// Show the text in white only if its active
								className={cn('sidebar-label', {
									'!text-white': isActive,
								})}
							>
								{item.label}
							</p>
						</Link>
					);
				})}
			</nav>
		</section>
	);
};

export default Sidebar;
