import "../_assets/styles.css";
import { DropdownProps, User } from "../_types/types";
import { SearchResult } from "./SearchResult";

export const Dropdown: React.FC<DropdownProps> = ({
	results,
	onSelectName,
}) => {
	return (
		<div className="results-list">
			{results.map((result:User, id:number) => {
				return (
					<SearchResult
						result={result.name}
						key={id}
						onSelectName={() => onSelectName(result)}
					/>
				);
			})}
		</div>
	);
};
