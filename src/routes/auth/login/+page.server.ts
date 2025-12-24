import { fail, setError, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod4 } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { redirect, type Actions } from '@sveltejs/kit';

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

		const { email, password } = form.data;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return setError(form, 'password', 'Incorrect password.');
		}

		throw redirect(303, '/profile');
	}
};
