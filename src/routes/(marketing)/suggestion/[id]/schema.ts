import { z } from 'zod';

export const suggestionSchema = z.object({
	description: z.string().max(500)
});

export type SuggestionSchema = typeof suggestionSchema;
