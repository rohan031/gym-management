import { useState, useEffect } from "react";
import DisplayMember from "../Components/DisplayMember";
import Options from "../Components/Options";

function Members() {
	const [memeberData, setMemberData] = useState([]);
	const [search, setSearch] = useState("");

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
		if (search && search == member.id) {
			return (
				<DisplayMember
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

		if (!search) {
			return (
				<DisplayMember
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
		<div className="members">
			<Options
				placeholder="Search using ID..."
				search={search}
				setSearch={setSearch}
				link="/dashboard/add-member"
			/>

			<div className={`members-list ${list?.length < 1 ? "empty" : ""} `}>
				{list?.length > 0 && (
					<div className="members-list__head">
						<h3>Id</h3>

						<h3>Name</h3>

						<h3>Plan</h3>

						<h3 className="hide">Contact</h3>
					</div>
				)}

				{list?.length > 0 ? list : "No members found!"}
			</div>
		</div>
	);
}

export default Members;
