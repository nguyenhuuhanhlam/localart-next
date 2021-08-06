import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

export default function handler(req, res)
{
	const query = gql`
		{
			paintings {
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
	return request(STRAPI_ENDPOINT+'/graphql', query)
		.then(data=>res.status(200).json(data))
}
