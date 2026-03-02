import { z } from 'zod';

export const suggestionSchema = z.object({
	name: z.string().optional(),
	description: z.string().max(500)
});

export type SuggestionSchema = typeof suggestionSchema;
