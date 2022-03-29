import { useEffect } from "react";
import {
	Container,
	SimpleGrid,
	Image,
	Flex,
	Heading,
	Stack,
	Skeleton,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/header";
import { Arbiter, Creator } from "nftoupon";

const NFToupon_Key = process.env.NEXT_PUBLIC_NFTOUPON_KEY;

export default function Dashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status]);

	if (status === "authenticated") {
		return (
			<>
				<Header />
				<Container maxW={"5xl"} py={12}>
					<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
						<Stack spacing={4}>
							{session.role === "admin" ? (
								<>
									<Heading>Merchant</Heading>
									<Arbiter NFToupon_Key={NFToupon_Key} />
								</>
							) : (
								<>
									<Heading>Creator</Heading>
									<Creator NFToupon_Key={NFToupon_Key} />
								</>
							)}
						</Stack>
						<Flex>
							<Image
								rounded={"md"}
								alt={"feature image"}
								src={
									"https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
								}
								objectFit={"cover"}
							/>
						</Flex>
					</SimpleGrid>
				</Container>
			</>
		);
	}

	return <Skeleton startColor="pink.500" endColor="orange.500" height="20px" />;
}
