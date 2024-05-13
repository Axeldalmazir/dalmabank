'use client';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNavbar = ({ user }: MobileNavProps) => {
	const pathname = usePathname();
	return (
		<section className="w-full max-w-[264px]">
			<Sheet>
				<SheetTrigger>
					<Image
						src="/icons/hamburger.svg"
						width={30}
						height={30}
						alt="menu"
						className="cursor-pointer"
					/>
				</SheetTrigger>
				<SheetContent className="border-none bg-white" side="left">
					<nav className="flex flex-col gap-4">
						<Link
							href="/"
							className="mb-12 cursor-pointer flex items-center gap-1 px-4"
						>
							<Image
								src="/icons/logo.svg"
								width={40}
								height={40}
								alt="dalmabank logo"
								className="size-[24px] max-xl:size-14"
							/>
							<h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
								DalmaBank
							</h1>
						</Link>
						<div className="mobilenav-sheet">
							{/* SheetClose -> whenever we click on the window it will close it */}
							<SheetClose asChild>
								<nav className="flex h-full flex-col pt-16 gap-6 text-white ">
									{sidebarLinks.map((item) => {
										// Let us know which route is active using pathname
										const isActive =
											pathname === item.route ||
											pathname.startsWith(`${item.route}/`);
										return (
											// Apply the bg-bank-gradient only if the isActive is true
											<SheetClose asChild key={item.route}>
												<Link
													className={cn('mobilenav-sheet_close w-full', {
														'bg-bank-gradient': isActive,
													})}
													href={item.route}
													key={item.label}
												>
													<Image
														src={item.imgURL}
														alt={item.label}
														width={20}
														height={20}
														className={cn({
															'brightness-[3] invert-0': isActive,
														})}
													/>
													<p
														// Show the text in white only if its active
														className={cn('text-16 font-semibold text-black-2', {
															'!text-white': isActive,
														})}
													>
														{item.label}
													</p>
												</Link>
											</SheetClose>
										);
									})}
                                    
								</nav>
							</SheetClose>
						</div>
					</nav>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNavbar;
