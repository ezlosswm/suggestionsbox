import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { suggestionSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const urlId = event.params.id;
	const supabase = event.locals.supabase;

	const { data, error } = await supabase
		.from('suggestion_boxes')
		.select('*')
		.eq('id', urlId)
		.single();
	if (error) {
		// Handle the error appropriately +error.svelte
		console.log('Error fetching suggestion boxes:', error);
		return;
	}

	let suggestionBox: SuggestionBox = data;

	const { session, user } = await event.locals.safeGetSession();
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

		console.log('Suggestion Box with suggestions:', suggestionBox);

		return {
			suggestionBox
		};
	}

	return {
		suggestionBox
	};
};

export const actions = {
	default: async (event) => {
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
	}
};
