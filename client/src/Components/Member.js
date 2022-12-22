import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Member({ id, name, plan, contact, daysLeft, status }) {
	const [displayStatus, setDisplayStatus] = useState("Active");

	useEffect(() => {
		let tempStatus;
		switch (status) {
			case "0":
				tempStatus = "Active";
				break;

			case "1":
				tempStatus = "Due";
				break;

			case "2":
				tempStatus = "Expired";
				break;
		}

		setDisplayStatus(tempStatus);
	}, []);

	return (
		<div className="updates-list__item">
			<p>{id}</p>

			<p className="show member-redirect">
				<Link to={`/dashboard/${id}`}>{name}</Link>
			</p>

			<p>{plan}</p>

			<p>{contact}</p>

			<p className="show">{daysLeft}</p>

			<p className={`show ${displayStatus}`}>{displayStatus}</p>
		</div>
	);
}

export default Member;
