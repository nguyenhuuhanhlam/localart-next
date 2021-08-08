import { STRAPI_ENDPOINT } from '../lib/constants'
import styles from '../styles/PaintingCard.module.scss'

const InStockStatus = ({ in_stock }) =>
{
	return (
		<div className={`${styles.in_stock}`}>
		{
			in_stock > 0
				? <i className="bi bi-bag-plus"></i>
				: '-'
		}
		</div>
	)
}

const PaintingCard = ({ item,options,itemOnClick,artistOnClick,paintingtypeOnClick }) =>
{
	const { vn_title,artist,media,painting_type,in_stock } = item

	if (item)
		return (
			<div>
				<div
					className={styles.photo}
					onClick={itemOnClick}
				>
					<img alt="" src={ STRAPI_ENDPOINT+media[0].formats.thumbnail.url }/>
				</div>
				<div className={styles.infos}>
					<div>
						<div className={styles.title}>{ vn_title.replace('|','\u2022') }</div>
						<div className={styles.artist}>{ artist.full_name }</div>
					</div>
					{
						options
						? options.pick
							? <div className={styles.painting_type}>{ painting_type.en_name }</div>
							: null
						: <InStockStatus in_stock={in_stock} />
					}
					
				</div>
			</div>
		)
	else
		return 'Pending...'
}

export default PaintingCard