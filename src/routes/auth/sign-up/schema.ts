import { z } from 'zod/v4';

const passwordSchema = z
	.object({
		password: z.string().min(8).max(50),
		confirm: z.string().min(8).max(50)
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ['confirm']
	});

export const formSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	password: passwordSchema
});

export type FormSchema = typeof formSchema;
