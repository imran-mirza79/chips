"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../_assets/styles.css";
import { SearchBarProps, User } from "../_types/types";

export const SearchBar: React.FC<SearchBarProps> = ({
	setResults,
	selectedNames,
	setSelectedNames,
	input,
	setInput,
	lastSelectedIndex,
	setLastSelectedIndex,
}) => {
	const fetchData = (value:string) => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((json) => {
				const filteredResults = json.filter((user:User) => {
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

	const handleRemoveUser = (userId:number) => {
		setSelectedNames((prevUsers) =>
			prevUsers.filter((user) => user.id !== userId)
		);
	};

	const handleChange = (value:string) => {
		setInput(value);
		fetchData(value);
	};

	const handleBackspace = () => {
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
		<div className="input-wrapper">
			<FaSearch id="search-icon" />
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
