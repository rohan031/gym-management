import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";

function Dashboard() {
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		let token = sessionStorage.getItem("token");
		const storageIsAdmin = sessionStorage.getItem("isAdmin");

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
					if (!res.success) {
						navigate("/");
					}

					if (storageIsAdmin) {
						setIsAdmin(storageIsAdmin);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			navigate("/");
		}
	}, []);

	return (
		<div className="dashboard">
			<nav className="dashboard-nav">
				<ul>
					<li>
						<NavLink
							to="/dashboard/updates"
							className={(navData) => (navData.isActive ? "active" : "")}
						>
							Updates
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/dashboard/members"
							className={(navData) => (navData.isActive ? "active" : "")}
						>
							Members
						</NavLink>
					</li>

					{/* {isAdmin && (
						<li>
							<NavLink
								to="/dashboard/trainers"
								className={(navData) => (navData.isActive ? "active" : "")}
							>
								Trainers
							</NavLink>
						</li>
					)} */}
				</ul>
			</nav>

			<div className="dashboard-content">
				<Suspense fallback={<h1>Loading!!!</h1>}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}

export default Dashboard;
