import { KeyboardEvent } from "react";
import { FaSearch } from "react-icons/fa";

import "../_assets/styles.css";
import { SearchBarProps, User } from "../_types/types";
import fetchRandomUserData from "../_utils/utils";

export const SearchBar: React.FC<SearchBarProps> = ({
	setResults,
	selectedNames,
	setSelectedNames,
	input,
	setInput,
	lastSelectedIndex,
	setLastSelectedIndex,
}) => {
	const fetchData = async (value: string) => {
		const filteredData = await fetchRandomUserData(value, selectedNames);
		setResults(filteredData);
	};

	const handleRemoveUser = (userId: number) => {
		setSelectedNames((prevUsers) =>
			prevUsers.filter((user) => user.id !== userId)
		);
	};

	const handleChange = (value: string) => {
		setInput(value);
		fetchData(value);
	};

	const handleBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (lastSelectedIndex !== null) {
			const lastUser = selectedNames[lastSelectedIndex];
			if (lastUser) {
				handleRemoveUser(lastUser.id);
			}
			setLastSelectedIndex(null);
		} else if (selectedNames.length > 0) {
			setLastSelectedIndex(selectedNames.length - 1);
		}
	};

	return (
		<div>
			<div className="chips-container">
				{selectedNames.map((user, index) => (
					<div
						key={user.id}
						className={`chip ${
							index === lastSelectedIndex ? "highlight" : ""
						}`}
					>
						{user.name}
						<span
							className={`remove-icon ${
								index === lastSelectedIndex ? "highlight" : ""
							}`}
							onClick={() => handleRemoveUser(user.id)}
						>
							&times;
						</span>
					</div>
				))}
			</div>
			<div>
				<input
					placeholder="Type to search..."
					value={input}
					onKeyDown={(e) =>
						input === "" &&
						e.key === "Backspace" &&
						handleBackspace(e)
					}
					onChange={(e) => handleChange(e.target.value)}
				/>
			</div>
		</div>
	);
};
