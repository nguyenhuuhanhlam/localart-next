import { STRAPI_ENDPOINT } from '../lib/constants'
import styles from '../styles/PaintingCard.module.scss'

const PaintingCard = ({ item,itemOnClick }) =>
{
	const {vn_title,artist,media,in_stock} = item

	if (item)
		return (
			<div onClick={itemOnClick}>
				<div className={`${styles.photo}`}>
					<img alt="" src={ STRAPI_ENDPOINT+media[0].formats.thumbnail.url }/>
				</div>
				<div className={`${styles.infos}`}>
					<div>
						<div className={`${styles.title}`}>{ vn_title.replace('|','\u2022') }</div>
						<div className={`${styles.artist}`}>{ artist.full_name }</div>
					</div>
					<div className={`${styles.in_stock}`}>
					{
						in_stock > 0
							? <i className="bi bi-bag-plus"></i>
							: '-'
					}
					</div>
				</div>
			</div>
		)
	else
		return 'Pending...'
}

export default PaintingCard