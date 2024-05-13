import React from 'react';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Control } from 'react-hook-form';
import {z} from 'zod'
import { authformSchema } from '@/lib/utils';
import { FieldPath } from 'react-hook-form';

const formSchema = authformSchema('sign-up')

interface CustomInputProps{
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>
    label: string,
    placeholder: string,
}


const CustomInput = ({ control, name, label, placeholder }: CustomInputProps) => {
	return (
		<>
			<FormField
				control={control}
				name={name}
				render={({ field }) => (
					<div className="form-item">
						<FormLabel className="form-label">{label}</FormLabel>
						<div className="flex w-full flex-col">
							{/* Have to spread all the properties of the field to work properly */}
							<FormControl>
								<Input
									placeholder={placeholder}
									className="input-class"
                                    type={name === 'password' ? 'password' : 'text' }
									{...field}
								/>
							</FormControl>
							<FormMessage className="form-message mt-2" />
						</div>
					</div>
				)}
			/>
		</>
	);
};

export default CustomInput;
