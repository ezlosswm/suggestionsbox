import { z } from 'zod/v4';

export const formSchema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		email: z.email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters').max(50),
		confirm: z.string()
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ['confirm']
	});

export type FormSchema = typeof formSchema;
