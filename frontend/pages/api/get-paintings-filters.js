import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

export default function handler(req, res)
{
	const { artist_id } = req.query

	const q = gql`
		{ paintings (
			where: {
				artist: { id: "${artist_id}" }
			}
		) {
			id
			vn_title
			painting_type {
				en_name
			}
			in_stock
			media {
				formats
			}
		}}
	`

	return request(STRAPI_ENDPOINT+'/graphql', q)
		.then(data=>res.status(200).json(data))
}