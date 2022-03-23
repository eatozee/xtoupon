import prisma from "../../config/db";
import isEmpty from "lodash/isEmpty";

export default async (req, res) => {
	const { email, password, role } = req.body;

	try {
		const user = await prisma.user.findFirst({
			where: {
				email: email,
				password: password,
				role: role,
			},
		});

		if (!isEmpty(user)) {
			res.status(200).json({ user });
		} else {
			res.status(200).json({ user: [] });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};
