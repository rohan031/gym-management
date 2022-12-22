import * as yup from "yup";

const LoginSchema = yup.object().shape({
	username: yup
		.string("Username is required!")
		.required("Username is required to Sign In!"),

	password: yup
		.string()
		.required("Password is required to Sign In!")
		.min(6, "Invalid Password!"),
});

export default LoginSchema;
