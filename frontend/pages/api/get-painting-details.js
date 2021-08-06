import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

export default function handler(req, res)
{
	const { id } = req.query

	const q = gql`
		{
			painting(id:"${id}") {
				id
				en_title
				vn_title
				year
				width
				height
				price
				in_stock
				price_vat
				price_unit
				painting_type {
					en_name
				}
				artist {
					id
					full_name
				}
				media {
					formats
				}
			}
		}
	`

	return request(STRAPI_ENDPOINT+'/graphql', q)
		.then(data=>res.status(200).json(data))
}

