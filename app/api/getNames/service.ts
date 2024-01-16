import { User } from "@/app/_types/types";

export default function fetchRandomUserData(
	value: string,
	selectedNames: User[]
) {
    const url: string = process.env.API_ENDPOINT as string;
	fetch(url)
		.then((response) => response.json())
		.then((json) => {
			const filteredResults = json.filter((user: User) => {
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
            return filteredResults;
		});
}
