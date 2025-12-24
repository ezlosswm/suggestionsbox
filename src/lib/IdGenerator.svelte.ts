export class SuggestionBoxIdGenerator {
	suggestionBoxId = $state('');

	makeId() {
		const MAXLENGTH = 8;
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;

		this.suggestionBoxId = ''; // Reset before generating

		for (var i = 0; i < MAXLENGTH; i++) {
			this.suggestionBoxId += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return this.suggestionBoxId;
	}

	makeLinkId() {
		return `/suggestion/${this.suggestionBoxId}`;
	}
}
