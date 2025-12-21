import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { json } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const supabase = event.locals.supabase;

		const form = await superValidate(event, zod4(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { name, email, password } = form.data;

		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password.password,
			options: {
				data: {
					full_name: name
				}
			}
		});

		if (error) {
			console.error('Error sign up user: ', error.message);
			return json({ error: error.message }, { status: 400 });
		}

		redirect(303, '/profile');
	}
};
