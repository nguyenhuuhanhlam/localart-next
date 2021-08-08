import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

export default function handler(req, res)
{
	let { limit,start } = req.query

	if (!limit)
		limit = 25
	if (!start)
		start = 0

	const q = gql`
		{
			paintings (limit:${limit},start:${start}) {
				id
				en_title
				vn_title
				in_stock
				artist {
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
