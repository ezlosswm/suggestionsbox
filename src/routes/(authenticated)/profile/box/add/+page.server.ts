import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	await event.parent();

	return {
		form: await superValidate(zod4(formSchema))
	};
};
export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
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
				public_link: 'test.com/pub/fdads'
			})
			.select();

		if (error) {
			console.error('Error inserting into suggestion box.', error.message);
			return fail(500, {
				errorMessage: 'Unknown error.'
			});
		}

		console.log('User ID: ', user?.id);

		console.log('Form Data, name: ', form.data.name);
		console.log('Form Data, description: ', form.data.description);

		const box = {
			name: form.data.name,
			description: form.data.description
		};

		console.log('Box: ', box);

		return { form };
	}
} satisfies Actions;
