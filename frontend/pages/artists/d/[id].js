import { useRouter } from 'next/router'
import { Breadcrumb, Container, Row, Col, Nav } from 'react-bootstrap'

import { HOST_URL,STRAPI_ENDPOINT } from '../../../lib/constants'

const ArtistDetail = ({ artistData, __ready=true }) =>
{
	console.log(artistData)
	const router = useRouter()
	// const { id } = router.query
	return (
		<Container className="p-3 pt-5">
			<Breadcrumb>
				<Breadcrumb.Item href="/artists">Artists</Breadcrumb.Item>
				<Breadcrumb.Item active>Biography</Breadcrumb.Item>
			</Breadcrumb>

			<div>
			{artistData.full_name}
			</div>
		</Container>
	)
}

export const getServerSideProps = async (context) =>
{
	try {
		const { id } = context.params

		const artist_response = await fetch(`${HOST_URL}/api/get-artist-details?id=${id}`)
		const artist_data = await artist_response.json()

		return {
			props: {
				artistData: artist_data.artist
			}
		}
	} catch (error) {
		return {props:{__ready:false}}
	}
}

export default ArtistDetail