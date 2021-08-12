import styles from '../styles/Tag.module.scss'

const Tag = ({text,itemOnClick}) =>
{
	return (
		<div
			className={styles.container}
			onClick={itemOnClick}
		>
			<span>{text}</span>
		</div>
	)
}

export default Tag