import { z } from 'zod/v4';

export const formSchema = z.object({
	name: z.string()
});

export type FormSchema = typeof formSchema;
