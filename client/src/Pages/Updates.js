import { useState, useEffect } from "react";
import Member from "../Components/Member";

function Updates() {
	const [memeberData, setMemberData] = useState([]);
	const [filter, setFilter] = useState(1);

	useEffect(() => {
		fetch("/members")
			.then((res) => res.json())
			.then((res) => {
				if (res.success) {
					setMemberData(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const list = memeberData.map((member) => {
		if (filter == 3) {
			return (
				<Member
					key={member.id}
					id={member.id}
					name={member.name}
					plan={member.plan}
					contact={member.contact}
					daysLeft={member.daysLeft}
					status={member.status}
				/>
			);
		} else if (member.status == filter) {
			return (
				<Member
					key={member.id}
					id={member.id}
					name={member.name}
					plan={member.plan}
					contact={member.contact}
					daysLeft={member.daysLeft}
					status={member.status}
				/>
			);
		}
	});

	return (
		<div className="updates">
			<select onChange={(e) => setFilter(e.target.value)} value={filter}>
				<option value="3">All Members</option>
				<option value="0">Active</option>
				<option value="1">Due</option>
				<option value="2">Expired</option>
			</select>

			<div className={`updates-list ${list?.length < 1 ? "empty" : ""} `}>
				{list?.length > 0 && (
					<div className="updates-list__head">
						<h3>Id</h3>

						<h3 className="show">Name</h3>

						<h3>Plan</h3>

						<h3>Contact</h3>

						<h3 className="show">Days Left</h3>

						<h3 className="show">Status</h3>
					</div>
				)}
				{list?.length > 0 ? list : "No members present"}
			</div>
		</div>
	);
}

export default Updates;
