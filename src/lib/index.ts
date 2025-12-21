export function makeLinkId() {
	const MAXLENGTH = 6;

	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;

	for (var i = 0; i < MAXLENGTH; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	let linkId = `/suggestion/${result}`;

	return linkId;
}

export function deleteAccount() {
	console.log('Redirect to delete account page.');
}
