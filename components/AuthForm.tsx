'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authformSchema } from '@/lib/utils';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomInput from './CustomInput';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter
	const [user, setUser] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const formSchema = authformSchema(type);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
        setIsLoading(true);
        try {
            // sign up With Appwrite & create plaid token 

            if(type === 'sign-up'){
                const newUser = await SignUp(data);
                setUser(newUser);

                }
                if(type === 'sign-in'){
                    const response = await signIn({
                        email: data.email,
                        password: data.password
                    })
                if (response) router.push('/')
            }
            }
        catch(error){
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }

	}

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href="/" className="mb-12 cursor-pointer flex items-center gap-1">
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

				<div className="flex flex-col gap-1 md:gap-3">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">
						{/* If the user is registered good else display Link account else if the type is sign-in render sign in else render Sign-up */}
						{user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
						<p className="text-16 font-normal text-grey-600">
							{user
								? 'Link your account to get started'
								: 'Please enter your details'}
						</p>
					</h1>
					{user ? (
						<div className="flex flex-col gap-4"></div>
					) : (
						<>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									{type === 'sign-up' && (
										<>
											<div className="flex gap-4">
												<CustomInput
													control={form.control}
													name="firstName"
													label="First Name"
													placeholder="ex: Your First Name"
												/>
												<CustomInput
													control={form.control}
													name="lastName"
													label="Last Name"
													placeholder="ex: Your Name"
												/>
											</div>
											<CustomInput
												control={form.control}
												name="address1"
												label="Address"
												placeholder="Enter your specific address"
											/>
                                            <CustomInput
												control={form.control}
												name="city"
												label="City"
												placeholder="Enter your specific city"
											/>
											<div className="flex gap-4">
												<CustomInput
													control={form.control}
													name="state"
													label="State"
													placeholder="ex: Toronto"
												/>
												<CustomInput
													control={form.control}
													name="postalCode"
													label="Postal Code"
													placeholder="ex: M5V 4A2"
												/>
											</div>
											<div className="flex gap-4">
												<CustomInput
													control={form.control}
													name="dateOfBirth"
													label="Date of Birth"
													placeholder="ex: yyyy-mm-dd"
												/>
												<CustomInput
													control={form.control}
													name="ssn"
													label="SSN"
													placeholder="ex: 1234"
												/>
											</div>
										</>
									)}
									<CustomInput
										control={form.control}
										name="email"
										label="email"
										placeholder="Enter your email"
									/>
									<CustomInput
										control={form.control}
										name="password"
										label="password"
										placeholder="Enter your password"
									/>

									<div className="flex flex-col gap-4">
										<Button
											type="submit"
											disabled={isLoading}
											className="form-btn"
										>
											{isLoading ? (
												<>
													<Loader2 size={20} className="animated-spin" /> &nbsp;
													Loading ...
												</>
											) : type === 'sign-in' ? (
												'Sign In'
											) : (
												'Sign Up'
											)}
										</Button>
									</div>
								</form>
							</Form>

							<footer className="flex justify-center gap-1">
								<p className="text-14 font-normal text-gray-600">
									{type === 'sign-in'
										? "Don't have an account?"
										: 'Already have an account?'}{' '}
								</p>
								<Link
									className="form-link"
									href={type === 'sign-in' ? '/sign-up' : 'sign-in'}
								>
									{type === 'sign-in' ? 'Sign Up' : 'Sign In'}
								</Link>
							</footer>
						</>
					)}
				</div>
			</header>
		</section>
	);
};

export default AuthForm;
