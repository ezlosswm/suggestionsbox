declare global {
	type SuggestionBox = {
		id: string;
		box_title: string;
		suggestions: Suggestion[];
		created_at: string;
		public_link: string;
	};
	type Suggestion = {
		id: string;
		name: string;
		description: string;
		created_at?: string;
	};
}

export {};
