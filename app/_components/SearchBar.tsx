"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../_assets/styles.css";

export const SearchBar = ({
	setResults,
	selectedNames,
	setSelectedNames,
	input,
	setInput,
}) => {
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

	const fetchData = (value) => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((json) => {
				const filteredResults = json.filter((user) => {
					return (
						value &&
						user &&
						user.name &&
						user.name.toLowerCase().includes(value) &&
						!selectedNames.some(
							(selectedUser) => selectedUser.id === user.id
						)
					);
				});
				setResults(filteredResults);
			});
	};

	const handleRemoveUser = (userId) => {
		setSelectedNames((prevUsers) =>
			prevUsers.filter((user) => user.id !== userId)
		);
	};

	const handleChange = (value) => {
		setInput(value);
		fetchData(value);
	};

	 const handleBackspace = () => {
			if (lastSelectedIndex !== null) {
				// Remove the last chip on backspace press
				const lastUser = selectedUsers[lastSelectedIndex];
				handleRemoveUser(lastUser.id);
			}
		};

	return (
		<div className="input-wrapper">
			<FaSearch id="search-icon" />
			<div className="chips-container">
				{selectedNames.map((user) => (
					<div
						key={user.id}
						className={`chip ${
							backspaceCount === 1 ? "highlight" : ""
						}`}
					>
						{user.name}
						<span
							className="remove-icon"
							onClick={() => handleRemoveUser(user.id)}
						>
							&times;
						</span>
					</div>
				))}
			</div>
			<input
				placeholder="Type to search..."
				value={input}
				onKeyDown={(e) => e.key === "Backspace" && handleBackspace()}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</div>
	);
};
