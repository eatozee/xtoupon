import { useState } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Link,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast,
	RadioGroup,
	Radio,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
	const [user, setUser] = useState({ role: "admin", email: "", password: "" });
	const toast = useToast();
	const router = useRouter();

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<RadioGroup
							onChange={(value) => setUser({ ...user, role: value })}
							value={user.role}
						>
							<Stack direction="row">
								<Radio value="admin">Admin</Radio>
								<Radio value="user">User</Radio>
							</Stack>
						</RadioGroup>

						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								onChange={(event) =>
									setUser({ ...user, email: event.target.value })
								}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								onChange={(event) =>
									setUser({ ...user, password: event.target.value })
								}
							/>
						</FormControl>
						<Stack spacing={10}>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={async () => {
									const response = await signIn("credentials", {
										redirect: false,
										role: user.role,
										email: user.email,
										password: user.password,
									});

									if (response.ok) {
										router.push("/dashboard");
									} else {
										toast({
											position: "top",
											title: "Credentials Sign in",
											description:
												"Please try the valid username and password.",
											status: "error",
											duration: 9000,
											isClosable: true,
										});
									}
								}}
							>
								Sign in
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								New user?
								<NextLink href="/" passHref>
									<Link color={"blue.400"}> Sign up</Link>
								</NextLink>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
