function Input({ label, type, name, placeholder, error, register }) {
	return (
		<div className="input-item">
			<label htmlFor={name}>{label}</label>

			<input
				id={name}
				type={type}
				placeholder={placeholder}
				className={`${error ? "error" : ""}`}
				{...register(name)}
			/>

			<p className="error">{error?.message}</p>
		</div>
	);
}

export default Input;
