import * as yup from "yup";

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

const AddMemberSchema = yup.object().shape({
	id: yup.string().required("Id is a required field!"),
	name: yup.string().required("Name is a required field!"),
	plan: yup
		.number()
		.typeError("Invalid plan value!")
		.positive("Plans can't be negative!")
		.required("Plan is a required field!"),
	contact: yup
		.string()
		.matches(phoneRegex, "Invalid contact number!")
		.required("Contact number is a requied field!"),
	duration: yup
		.number()
		.typeError("Invalid duration")
		.positive("Duration should be greater than 0!")
		.required("Duration is required!"),
});

export default AddMemberSchema;
