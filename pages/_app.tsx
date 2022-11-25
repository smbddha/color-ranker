import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout';
import Head from 'next/head';



export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title>color ranker</title>
				<meta charSet="UTF-8" />
				<meta name="keywords" content="game, color, nextjs" />
				<meta name="author" content="smbddha" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}
