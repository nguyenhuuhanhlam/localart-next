import Cors from 'cors'
import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res)
{
	const q = gql`
		{
			homeViews {
				artists {
					id
					full_name
					represent {
						id
						vn_title
						en_title
						media {
							formats
						}
						painting_type {
							en_name
						}
					}
				}
				paintings {
					id
					en_title
					vn_title
					in_stock
					artist {
						id
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

	await runMiddleware(req, res, cors)

	return request(STRAPI_ENDPOINT+'/graphql', q)
		.then(data=>res.status(200).json(data))
}