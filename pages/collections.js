import { useEffect } from "react";
import { Container, Skeleton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/header";
import { Collectibles } from "nftoupon";

const NFToupon_Key = process.env.NEXT_PUBLIC_NFTOUPON_KEY;

export default function Collections() {
	const { status } = useSession();
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
					<Collectibles NFToupon_Key={NFToupon_Key} />
				</Container>
			</>
		);
	}

	return <Skeleton startColor="pink.500" endColor="orange.500" height="20px" />;
}
