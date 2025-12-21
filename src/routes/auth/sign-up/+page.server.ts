import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

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
			password: password,
			options: {
				data: {
					full_name: name
				}
			}
		});

		if (error) {
			if (error.message.includes('already registered')) {
				return setError(form, 'email', 'This email is already registered.');
			}

			// Generic error
			return setError(form, 'password', error.message || 'Unable to create account');
		}

		throw redirect(303, '/profile');
	}
};
