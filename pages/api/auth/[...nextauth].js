import NextAuth from "next-auth";
import prisma from "../../../config/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import isEmpty from "lodash/isEmpty";
import CredentialsProvider from "next-auth/providers/credentials";

const adapter = PrismaAdapter(prisma);
adapter.updateUser = ({ id, ...data }) =>
	prisma.user.update({ where: { id }, data });

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			/* credentials: {
				email: { label: "Username", type: "text", placeholder: "xtoupon" },
				password: { label: "Password", type: "password" },
			}, */
			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)

				const res = await fetch("https://xtoupon.vercel.app/api/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(credentials),
				});

				const { user } = await res.json();

				// If no error and we have user data, return it
				if (res.ok && !isEmpty(user)) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true;
		},
		async session({ session, user, token }) {
			!isEmpty(token) && (session.role = token.role);
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			!isEmpty(user) && (token.role = user.role);
			return token;
		},
	},
	adapter,
	session: { strategy: "jwt" },
});
