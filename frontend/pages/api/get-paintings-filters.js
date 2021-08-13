import { request, gql } from 'graphql-request' 
import { STRAPI_ENDPOINT } from '../../lib/constants'

export default function handler(req, res)
{
	const { artist_id,painting_type,price_min,price_max } = req.query

	const all = [
		artist_id && {artist_id} || null,
		painting_type && {painting_type} || null,
		price_min && {price_min} || null,
		price_max && {price_max} || null
	]
	const filters = []

	all.filter(v=>v).map((v,k)=>{
		if (v.artist_id)
			filters.push(`artist: { id: "${v.artist_id}" }`)

		if (v.painting_type)
			filters.push(`painting_type : { en_name: "${v.painting_type}" }`)
	
		if (v.price_min)
			filters.push(`price_gte : ${v.price_min}`)

		if (v.price_max>0)
			filters.push(`price_lte : ${v.price_max}`)
	})

	const q = gql`
		{ paintings (
			where: {${filters.join(',')}}
		) {
			id
			vn_title
			artist {
				id
				full_name
			}
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