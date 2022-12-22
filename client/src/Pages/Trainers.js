import Options from "../Components/Options";
import { useState } from "react";

function Traniers() {
	const [search, setSearch] = useState("");

	return (
		<div className="trainers">
			<Options
				placeholder="Username..."
				search={search}
				setSearch={setSearch}
				link="/dashboard/add-trainer"
			/>
		</div>
	);
}

export default Traniers;
