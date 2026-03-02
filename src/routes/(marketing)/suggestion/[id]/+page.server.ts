import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { suggestionSchema } from './schema';
import { error, redirect, fail } from '@sveltejs/kit';

export const load = async (event) => {
	const urlId = event.params.id;
	const supabase = event.locals.supabase;

	const { data, error: suggestionBoxError } = await supabase
		.from('suggestion_boxes')
		.select('*')
		.eq('id', urlId)
		.single();
	if (suggestionBoxError) {
		// Handle the error appropriately +error.svelte
		error(404, 'Suggestion box not found');
	}

	let suggestionBox: SuggestionBox = data;

	const { session } = await event.locals.safeGetSession();
	if (session) {
		let suggArray: Suggestion[] = [];
		const { data: suggestionsData, error: suggestionsError } = await supabase
			.from('suggestions')
			.select('*')
			.eq('suggestion_box_id', urlId);

		if (suggestionsError) {
			console.log('Error fetching suggestions:', suggestionsError);
		} else {
			suggArray = suggestionsData;
		}

		suggestionBox = {
			...suggestionBox,
			suggestions: suggArray
		};

		return {
			suggestionBox
		};
	}

	return {
		suggestionBox
	};
};

export const actions = {
	submitSuggestion: async (event) => {
		const form = await superValidate(event, zod4(suggestionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { description } = form.data;
		const { name } = form.data;
		const id = event.params.id;

		const supabase = event.locals.supabase;

		const { error } = await supabase.from('suggestions').insert({
			name,
			description,
			suggestion_box_id: id
		});

		if (error) {
			console.log('Error inserting suggestion:', error);
			return fail(500, { form });
		}

		return { form };
	},
	deleteSuggestionBox: async (event) => {
		const { session } = await event.locals.safeGetSession();
		if (!session) {
			return fail(401, { error: 'Unauthorized' });
		}

		// 1. Log to ensure the URL param and session ID are exactly what you expect
		console.log('Target Box ID:', event.params.id);
		console.log('Logged in User:', session.user.id);

		const { data, error } = await event.locals.supabase
			.from('suggestion_boxes')
			.delete()
			.eq('id', event.params.id)
			.select(); // 2. Add .select() to return the rows that were actually deleted

		if (error) {
			console.log('Error deleting suggestion box:', error);
			return fail(500, { error: 'Failed to delete suggestion box' });
		}

		// 3. Catch the silent failure
		if (!data || data.length === 0) {
			console.log("Silent Failure: 0 rows deleted. Either the ID didn't match, or RLS blocked it.");
			// Prevent the redirect so you can debug!
			return fail(403, { error: 'Could not delete: Not authorized or box not found.' });
		}

		throw redirect(303, '/profile/box');
	}
};
