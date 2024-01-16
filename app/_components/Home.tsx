"use client";
import React, { useState } from "react";
import "../_assets/styles.css";
import { SearchBar } from "./SearchBar";
import { Dropdown } from "./Dropdown";
import { User } from "../_types/types";

function Home() {
	const [results, setResults] = useState<User[]>([]);
	const [selectedNames, setSelectedNames] = useState<User[]>([]);
	const [input, setInput] = useState<string>("");
	const [lastSelectedIndex, setLastSelectedIndex] = useState<number|null>(null);

	const handleSelectUser = (selectedUser: User) => {
		setSelectedNames((prevUsers) => [...prevUsers, selectedUser]);
		setInput("");
		setResults([]);
	};

	return (
		<div className="app">
			<div className="search-bar-container">
				<SearchBar
					setResults={setResults}
					selectedNames={selectedNames}
					setSelectedNames={setSelectedNames}
					input={input}
					setInput={setInput}
					lastSelectedIndex={lastSelectedIndex}
					setLastSelectedIndex={setLastSelectedIndex}
				/>
				{results && results.length > 0 && (
					<Dropdown
						results={results}
						onSelectName={handleSelectUser}
					/>
				)}
			</div>
		</div>
	);
}

export default Home;
