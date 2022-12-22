import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginSchema from "../formSchemas/LoginSchema";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: "onTouched", resolver: yupResolver(LoginSchema) });

	const [err, setErr] = useState({
		isError: false,
		msg: "",
	});

	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem("token");

		if (token) {
			const options = {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				body: JSON.stringify({ token }),
			};

			fetch("/login/validate", options)
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					if (res.success) {
						navigate("/dashboard");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const handleLogin = (user, event) => {
		let isAdmin = user.username === "admin" ? true : false;

		let tempErr = {
			isError: false,
			msg: "",
		};

		user = { ...user, isAdmin };

		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(user),
		};

		fetch("/login", options)
			.then((res) => res.json())
			.then((res) => {
				handleRes(res);
			})
			.catch((err) => {
				console.log(err);
				tempErr = {
					isError: true,
					msg: "Can't sign in at the moment. Please try again later!",
				};
			});

		setErr(tempErr);
	};

	const handleRes = (res) => {
		if (!res.success) {
			setErr({
				isError: true,
				msg: res.msg,
			});

			return;
		}

		sessionStorage.setItem("token", res.token);
		sessionStorage.setItem("isAdmin", res.isAdmin);
		navigate("/dashboard");
	};

	return (
		<div className="login">
			<h1 className="login-head">Login</h1>
			<form className="login-form" onSubmit={handleSubmit(handleLogin)}>
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						placeholder="Username..."
						id="username"
						className={errors.username && "input-error"}
						{...register("username")}
					/>

					<p>{errors.username?.message}</p>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						placeholder="Password..."
						id="password"
						className={errors.password && "input-error"}
						{...register("password")}
					/>

					<p>{errors.password?.message}</p>
				</div>

				{err.isError && <p className="server-error">{err.msg}</p>}

				<button>Login</button>
			</form>
		</div>
	);
}

export default Login;
