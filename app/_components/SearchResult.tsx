import "../_assets/styles.css";
import { SearchResultProps } from "../_types/types";

export const SearchResult: React.FC<SearchResultProps> = ({
	result,
	onSelectName,
}) => {
	return (
		<div className="search-result" onClick={onSelectName}>
			{result}
		</div>
	);
};
