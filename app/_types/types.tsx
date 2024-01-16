export type User = {
	id: number;
	name: string;
};

export type SearchBarProps = {
	setResults: React.Dispatch<React.SetStateAction<User[]>>;
	selectedNames: User[];
	setSelectedNames: React.Dispatch<React.SetStateAction<User[]>>;
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	lastSelectedIndex: number | null;
	setLastSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export type SearchResultProps = {
	result: string;
	onSelectName: () => void;
};

export type DropdownProps = {
	results: User[];
	onSelectName: (selectedUser: User) => void;
};