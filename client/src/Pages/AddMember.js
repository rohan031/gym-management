import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddMemberSchema from "../formSchemas/AddMemberSchema";
import Input from "../Components/Input";
import { useState } from "react";
import Alert from "../Components/Alert";

function AddMember() {
	const [message, setMessage] = useState({
		display: false,
		success: true,
		msg: "",
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: "onTouched", resolver: yupResolver(AddMemberSchema) });

	const handleNewMember = (memberInfo, event) => {
		console.log(memberInfo);

		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(memberInfo),
		};

		console.log(options);

		fetch("/members/create", options)
			.then((res) => res.json())
			.then((res) => {
				handleRes(res);
			})
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

		setMessage(tempMessage);

		if (res.success) {
			reset();
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
		<div className="add-member">
			{message.display && (
				<Alert success={message.success} message={message.msg} />
			)}

			<h3>Add New member</h3>

			<div className="add-member__form">
				<form onSubmit={handleSubmit(handleNewMember)}>
					<Input
						label="Id"
						type="text"
						name="id"
						placeholder="Id..."
						error={errors.id}
						register={register}
					/>

					<Input
						label="Name"
						type="text"
						name="name"
						placeholder="Name..."
						error={errors.name}
						register={register}
					/>

					<Input
						label="Plan"
						type="text"
						name="plan"
						placeholder="Plan..."
						error={errors.plan}
						register={register}
					/>

					<Input
						label="Contact"
						type="text"
						name="contact"
						placeholder="Contact..."
						error={errors.contact}
						register={register}
					/>

					<Input
						label="Duration"
						type="text"
						name="duration"
						placeholder="Duration..."
						error={errors.duration}
						register={register}
					/>

					<button>Add member</button>
				</form>
			</div>
		</div>
	);
}

export default AddMember;
