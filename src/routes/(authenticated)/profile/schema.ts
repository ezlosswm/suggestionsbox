import { email, z } from 'zod/v4';

export const formSchema = z.object({
	name: z.string(),
	email: z.email()
});

export type FormSchema = typeof formSchema;
