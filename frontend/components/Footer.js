import { Nav,Navbar,Container } from 'react-bootstrap'
import styles from '../styles/Footer.module.scss'

const Footer = () =>
{
	return (
		<Navbar bg="light" variant="light" expand="lg">
			<Container>
				<div>
					<div className={styles.left_side}></div>
					<div className={styles.right_side}>
						<div>HDT VietNam Investment Joint Stock Company</div>
						<div>46 Tran Hung Dao - Hang Bai Ward - Hoan Kiem District - Ha Noi, VietNam</div>
						<div>T : 0243 952 3333</div>
						<div>F : 0243 952 3333</div>
						<div>E : tamelinh@gmail.com</div>
						<div style={{paddingTop:16}}>&copy; Copyright 2019 - 2021.</div>
					</div>
				</div>
			</Container>
		</Navbar>
	)
}

export default Footer