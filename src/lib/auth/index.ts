export const authenticateUser = async (locals: App.Locals) => {
	const { session, user } = await locals.safeGetSession();

	if (!user) {
		return null;
	}

	if (!session) {
		return null;
	}

	// Check if the user profile already exists in your database
	return {
		session,
		user
	};
};
