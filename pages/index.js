import { useState } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Stack,
	Select,
	Button,
	InputRightElement,
	Heading,
	Text,
	useColorModeValue,
	Link,
	useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function SignupCard() {
	const router = useRouter();
	const toast = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
	});

	const register = async () => {
		const response = await fetch(`/api/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: user.name,
				email: user.email,
				password: user.password,
				role: user.role,
			}),
		});

		const { message } = await response.json();

		if (message === "successfully created") {
			toast({
				title: "Account created.",
				position: "top",
				description: "We've created your account for you.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			router.push("/login");
		} else if (message === "already registered") {
			toast({
				position: "top",
				title: "Account already exists.",
				description: "Please try with different details.",
				status: "warning",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				position: "top",
				title: "Something went wrong.",
				description: "Please try again.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up to get started ✌️
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool features
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="role" isRequired>
							<FormLabel>Role</FormLabel>
							<Select
								placeholder="Select Role"
								onChange={(event) =>
									setUser({ ...user, role: event.target.value })
								}
							>
								<option value="admin">Admin</option>
								<option value="user">User</option>
							</Select>
						</FormControl>

						<FormControl id="firstName" isRequired>
							<FormLabel>First Name</FormLabel>
							<Input
								type="text"
								onChange={(event) =>
									setUser({ ...user, name: event.target.value })
								}
							/>
						</FormControl>

						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								onChange={(event) =>
									setUser({ ...user, email: event.target.value })
								}
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(event) =>
										setUser({ ...user, password: event.target.value })
									}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								size="lg"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={register}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?
								<NextLink href="/login" passHref>
									<Link color={"blue.400"}> Login</Link>
								</NextLink>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
