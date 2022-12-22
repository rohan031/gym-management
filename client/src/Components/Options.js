import { Link } from "react-router-dom";

function Options({ search, setSearch, link, placeholder }) {
	return (
		<div className="options">
			<input
				type="text"
				placeholder={placeholder}
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>

			<Link to={link}>Add</Link>
		</div>
	);
}

export default Options;
