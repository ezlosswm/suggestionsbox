declare global {
	type SuggestionBox = {
		id: string;
		box_title: string;
		user_id: string;
		description: string;
		suggestions: Suggestion[];
		created_at: string;
		url: string;
	};
	type Suggestion = {
		id: string;
		name: string;
		description: string;
		created_at?: string;
	};
}

export {};
