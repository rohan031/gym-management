import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";

const Updates = lazy(() => import("./Pages/Updates"));
const Members = lazy(() => import("./Pages/Members"));
const Trainers = lazy(() => import("./Pages/Trainers"));
const AddMember = lazy(() => import("./Pages/AddMember"));
const MemberDetails = lazy(() => import("./Pages/MemberDetails"));

function Path() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Login />} />

				<Route path="/dashboard" element={<Dashboard />}>
					<Route index element={<Navigate to="updates" />} />
					<Route path="updates" element={<Updates />} />
					<Route path="members" element={<Members />} />

					<Route path="trainers" element={<Trainers />} />

					<Route path="add-member" element={<AddMember />} />
					<Route path="add-trainer" element={<Trainers />} />
					<Route path=":memberId" element={<MemberDetails />} />
				</Route>

				<Route path="/*" element={<NotFound />} />
			</Routes>
		</HashRouter>
	);
}

export default Path;
