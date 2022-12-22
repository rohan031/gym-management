function Alert({ success, message }) {
	return (
		<div className={`alert ${success ? "" : "error"}`}>
			<h3>{success ? "Success" : "Error"}</h3>

			<p>{message}</p>
		</div>
	);
}

export default Alert;
