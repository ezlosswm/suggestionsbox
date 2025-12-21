export const load = async (event) => {
	await event.parent();
	const supabase = event.locals.supabase;

	const { data: boxes, error } = await supabase.from('suggestion_boxes').select('*');
	if (error) {
		console.error('Error loading boxes: ', error.message);
	}

	return {
		suggestionBoxes: boxes
	};
};
