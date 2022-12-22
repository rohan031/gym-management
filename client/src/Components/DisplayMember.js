import { Link } from "react-router-dom";

function DispalyMember({ id, name, plan, contact }) {
	return (
		<div className="members-list__item">
			<p>{id}</p>

			<p className="member-redirect">
				<Link to={`/dashboard/${id}`}>{name}</Link>
			</p>

			<p>{plan}</p>

			<p className="hide">{contact}</p>
		</div>
	);
}

export default DispalyMember;
