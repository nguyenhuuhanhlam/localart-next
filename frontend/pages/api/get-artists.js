import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

export default function handler(req, res)
{
	const q = gql`
		{
			artists {
				id
				full_name
			}
		}
	`
	return request(STRAPI_ENDPOINT+'/graphql', q)
		.then(data=>res.status(200).json(data))
}
