import styles from '../styles/Footer.module.scss'

const Footer = () =>
{
	return (
		<div className={styles.layout}>
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
	)
}

export default Footer