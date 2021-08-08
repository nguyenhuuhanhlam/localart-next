import { Breadcrumb, Container } from 'react-bootstrap'

const PaintingsFilters = () =>
{
	return (
		<Container>
			<Breadcrumb>
				<Breadcrumb.Item href="/paintings">All Paintings</Breadcrumb.Item>
				<Breadcrumb.Item active>Filters</Breadcrumb.Item>
			</Breadcrumb>
		</Container>
	)
}

export default PaintingsFilters