import { ChakraProvider, theme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export default function XToupon({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	);
}
