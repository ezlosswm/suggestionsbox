import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';

import { makeLinkId } from '$lib';

export const load: PageServerLoad = async (event) => {
	await event.parent();

	return {
		form: await superValidate(zod4(formSchema))
	};
};

export const actions = {
	default: async ({ url, request, locals: { supabase, safeGetSession } }) => {
		const form = await superValidate(request, zod4(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { session, user } = await safeGetSession();
		if (!session) {
			throw redirect(303, '/auth/login');
		}

		const { error } = await supabase
			.from('suggestion_boxes')
			.upsert({
				box_title: form.data.name,
				user_id: user?.id,
				url: makeLinkId(),
				description: form.data.description
			})
			.select();

		if (error) {
			console.error('Error inserting into suggestion box.', error.message);
			return fail(500, {
				errorMessage: 'Unknown error.'
			});
		}

		return { form };
	}
} satisfies Actions;
