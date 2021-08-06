import { STRAPI_ENDPOINT } from '../lib/constants'

const PaintingCard = ({ item,itemOnClick }) =>
{
	return (
		<div onClick={itemOnClick}>
			<div className="photo">
				<img alt="" src={ STRAPI_ENDPOINT+item.media[0].formats.thumbnail.url }/>
			</div>
			<div>{ item.vn_title }</div>
		</div>
	)
}

export default PaintingCard