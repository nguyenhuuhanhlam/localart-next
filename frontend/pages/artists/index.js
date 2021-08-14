import { useEffect,useState } from 'react'
import Link from 'next/link'
import { Breadcrumb, Container, Row, Col, Nav } from 'react-bootstrap'
import { STRAPI_ENDPOINT } from '../../lib/constants'
import { InformationIndication } from '../../components'

const Artists = () =>
{
	const [artists,setArtists] = useState([])
	useEffect(()=>{
		fetch(`/api/get-artists`)
			.then(response=>response.json())
			.then(jsonData=>setArtists(jsonData.artists))
	},[])

	return (
		<Container className="p-3 pt-5">
			<Breadcrumb>
				<Breadcrumb.Item active>The Artists</Breadcrumb.Item>
			</Breadcrumb>
			<Container  className="p-0">
			{
				artists.length
				? artists.map((v,k)=>{
					return (
						<Row key={k}>
							<Col className="fs-5">
								
								<Link href={ "/artists/d/"+v.id } passHref>
									<Nav.Link className="p-0 link-secondary">{ v.full_name }</Nav.Link>
								</Link>
								
							</Col>
						</Row>
					)
				})
				: <InformationIndication text="Pending..." iconName="bi-hourglass" />
			}
			</Container>
		</Container>
	)
}

export default Artists