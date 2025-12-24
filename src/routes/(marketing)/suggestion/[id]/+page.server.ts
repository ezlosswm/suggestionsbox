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
		const id = event.params.id;

		const supabase = event.locals.supabase;

		const { error } = await supabase.from('suggestions').insert({
			description,
			suggestion_box_id: id
		});

		if (error) {
			console.log('Error inserting suggestion:', error);
			return fail(500, { form });
		}

		// Handle success case, e.g., redirect or success message
		return { form };
	},
	deleteSuggestion: async (event) => {
		const { session } = await event.locals.safeGetSession();
		if (!session) {
			return fail(401, { error: 'Unauthorized' });
		}

		const { error } = await event.locals.supabase
			.from('suggestion_boxes')
			.delete()
			.eq('id', event.params.id);

		if (error) {
			return fail(500, { error: 'Failed to delete suggestion box' });
		}

		throw redirect(303, '/profile/box');
	}
};
