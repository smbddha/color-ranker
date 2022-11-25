import { Lexend_Deca } from '@next/font/google';
import Header from './header';
import Footer from './footer';

import styles from '../styles/Home.module.css'

const lexend = Lexend_Deca({ subsets: ['latin'] });

export default function Layout({ children }: { children: JSX.Element | JSX.Element[]}) {
	return (
			<div className={`${styles.container} ${lexend.className}`}>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</div>
	)
}
