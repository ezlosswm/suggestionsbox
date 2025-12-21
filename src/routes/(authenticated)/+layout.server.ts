import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, url }) => {
	const { session, user } = await safeGetSession();

	if (!session) {
		console.log('❌ No session, redirecting to login');
		throw redirect(303, `/auth/login?redirectTo=${url.pathname}`);
	}

	return {
		session,
		user
	};
};
