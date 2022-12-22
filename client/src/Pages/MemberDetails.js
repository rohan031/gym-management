import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "../Components/Alert";

function MemberDetails() {
	const { memberId } = useParams();
	const navigate = useNavigate();
	const [memberInfo, setMemberInfo] = useState({
		found: false,
		data: "",
	});

	const [update, setUpdate] = useState(123);

	const [message, setMessage] = useState({
		display: false,
		success: true,
		msg: "",
	});

	const [duration, setDuration] = useState(30);

	useEffect(() => {
		fetch(`/members/${memberId}`)
			.then((res) => res.json())
			.then((res) => {
				if (res.success) {
					setMemberInfo({
						found: true,
						data: res.data,
					});
				} else {
					setMemberInfo({
						found: false,
						data: res.msg,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [update]);

	const handleDelete = () => {
		fetch(`/members/${memberId}`, { method: "DELETE" })
			.then((res) => res.json())
			.then((res) => {
				if (res.success) {
					navigate("/dashboard/members");
				} else {
					setMessage({
						display: true,
						success: false,
						msg: res.msg,
					});

					setTimeout(() => {
						setMessage({
							display: false,
							status: true,
							msg: "",
						});
					}, 3000);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newDuration = +duration + +memberInfo.data.daysLeft;

		const user = {
			id: memberInfo.data.id,
			duration: newDuration,
		};

		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(user),
		};

		fetch("/members/update", options)
			.then((res) => res.json())
			.then((res) => handleRes(res))
			.catch((err) => {
				console.log(err);
			});
	};

	const handleRes = (res) => {
		let tempMessage = {
			display: true,
			success: res.success,
			msg: res.msg,
		};

		console.log(tempMessage);

		setMessage(tempMessage);

		if (res.success) {
			setUpdate(Math.random());
			setDuration(30);
		}

		setTimeout(() => {
			setMessage({
				display: false,
				status: true,
				msg: "",
			});
		}, 3000);
	};

	return (
		<div className={`member-info ${!memberInfo.found ? "not-found" : ""}`}>
			{message.display && (
				<Alert success={message.success} message={message.msg} />
			)}

			{!memberInfo.found && <h2>{memberInfo.data}</h2>}

			{memberInfo.found && (
				<>
					<h2>{memberInfo.data.name}</h2>

					<div className="member-info__details">
						<div className="member-info__details-item">
							<h3>ID: </h3>

							<p>{memberInfo.data.id}</p>
						</div>

						<div className="member-info__details-item">
							<h3>Plan: </h3>

							<p>{memberInfo.data.plan}</p>
						</div>

						<div className="member-info__details-item">
							<h3>Contact: </h3>

							<p>{memberInfo.data.contact}</p>
						</div>

						<div className="member-info__details-item">
							<h3>Days Left: </h3>

							<p>{memberInfo.data.daysLeft}</p>
						</div>

						<div className="member-info__details-item">
							<h3>Status: </h3>

							<p
								className={`${
									memberInfo.data.status == 0
										? "Active"
										: memberInfo.data.status == 1
										? "Due"
										: "Expired"
								}`}
							>
								{memberInfo.data.status == 0
									? "Active"
									: memberInfo.data.status == 1
									? "Due"
									: "Expired"}
							</p>
						</div>

						<form
							className="member-info__details-item increase"
							onSubmit={handleSubmit}
						>
							<input
								type="number"
								onChange={(e) => setDuration(e.target.value)}
								min={1}
								placeholder="Duration..."
								value={duration}
								required
							/>

							<button>Increase</button>
						</form>

						<button onClick={handleDelete} className="delete">
							Delete
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default MemberDetails;
