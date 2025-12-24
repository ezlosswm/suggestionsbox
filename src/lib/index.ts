import { page } from '$app/state';

export function deleteAccount() {
	console.log('Redirect to delete account page.');
}

export function convertTimeZone(isoString: string) {
	const dateObject = new Date(isoString);

	const formatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit'
	});

	return formatter.format(dateObject);
}

export function copyLink() {
	navigator.clipboard
		.writeText(page.url.toString())
		.then()
		.catch((err) => {
			console.error('Could not copy text: ', err);
		});
}
