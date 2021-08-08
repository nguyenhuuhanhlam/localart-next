import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

export default function handler(req, res)
{
	const q = gql`
		{
			homeViews {
				artists {
					full_name
					represent {
						id
						vn_title
						en_title
						media {
							formats
						}
					}
				}
				paintings {
					en_title
					vn_title
					in_stock
					artist {
						full_name
					}
					media {
						formats
					}
					painting_type {
						en_name
					}
				}
			}
		}
	`

	return request(STRAPI_ENDPOINT+'/graphql', q)
		.then(data=>res.status(200).json(data))
}