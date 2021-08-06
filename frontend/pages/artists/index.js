import { Breadcrumb, Container, Row, Col, Nav } from 'react-bootstrap'
import { InformationIndication } from '../../components'

const Artists = ({ artists }) =>
{
	if (artists)
		return (
			<Container className="p-3 custom-media">
				<Breadcrumb>
					<Breadcrumb.Item active>The Artists</Breadcrumb.Item>
				</Breadcrumb>
				<Container  className="p-0 custom-media">
				{
					artists.map((v,k)=>{
						return (
							<Row key={k}>
								<Col className="fs-3">
									<Nav.Link 
										href={ "/artists/d/"+v.id }
										className="p-0"
									>
										{ v.full_name }
									</Nav.Link>
								</Col>
							</Row>
						)
					})
				}
				</Container>
			</Container>
		)
	else
		return <InformationIndication text="No Data." />
}

Artists.getInitialProps = async () =>
{
	const res = await fetch('http://localhost:3000/api/get-artists')
	const json = await res.json()
	return { artists: json.artists }
}

export default Artists