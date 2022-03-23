import prisma from "../../config/db";
import isEmpty from "lodash/isEmpty";

export default async (req, res) => {
	const { name, email, password, role } = req.body;
	let message;

	try {
		const user = await prisma.user.findFirst({
			where: {
				email,
				password,
				role,
			},
		});
		if (isEmpty(user)) {
			await prisma.user.create({
				data: {
					name,
					email,
					password,
					role,
				},
			});

			message = "successfully created";
		} else {
			message = "already registered";
		}

		res.status(200).json({ message });
	} catch (error) {
		res.status(500).json({ error });
	}
};
