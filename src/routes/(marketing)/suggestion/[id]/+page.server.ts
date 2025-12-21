export const load = async (event) => {
	await event.parent();

	const urlId = event.params.id;

	// const supabase = event.locals.supabase

	// const {data, error} = await supabase.from('suggestion_boxes').select('*')

	console.log(urlId);

	return {
		pd: urlId
	};
};
