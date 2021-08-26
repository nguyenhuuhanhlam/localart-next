import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

export default function handler(req, res)
{
	const { id } = req.query

	const q = gql`
		{
			artist(id:"${id}") {
				id
				full_name
				biography
				profile_picture {
					id
				}
				represent {
					id
				}
			}
		}
	`
	return request(STRAPI_ENDPOINT+'/graphql', q)
		.then(data=>res.status(200).json(data))
}
