import { useRouter } from 'next/router'
import { Breadcrumb, Container, Row, Col, Nav } from 'react-bootstrap'

const ArtistDetail = ({ __ready=true }) =>
{
	const router = useRouter()
	// const { id } = router.query
	return (
		<Container className="p-3 pt-5">
			<Breadcrumb>
				<Breadcrumb.Item href="/artists">Artists</Breadcrumb.Item>
				<Breadcrumb.Item active>Biography</Breadcrumb.Item>
			</Breadcrumb>
		</Container>
	)
}

export const getServerSideProps = async (context) =>
{
	try {
		return {
			props: {}
		}
	} catch (error) {
		return {props:{__ready:false}}
	}
}

export default ArtistDetail