import { useEffect,useState } from 'react'
import Link from 'next/link'
import { Breadcrumb, Container, Row, Col, Nav } from 'react-bootstrap'
import { HOST_URL,STRAPI_ENDPOINT } from '../../lib/constants'
import { InformationIndication } from '../../components'

const Artists = () =>
{
	const [artists,setArtists] = useState([])
	useEffect(()=>{
		fetch(`${HOST_URL}/api/get-artists`)
			.then(response=>response.json())
			.then(jsonData=>setArtists(jsonData.artists))
	},[])

	return (
		<Container className="p-3 custom-media">
			<Breadcrumb>
				<Breadcrumb.Item active>The Artists</Breadcrumb.Item>
			</Breadcrumb>
			<Container  className="p-0 custom-media">
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