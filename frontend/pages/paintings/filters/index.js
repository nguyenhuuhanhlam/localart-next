import Link from 'next/link'
import { Breadcrumb, Container } from 'react-bootstrap'

const PaintingsFilters = () =>
{
	return (
		<Container className="p-3">
			<Breadcrumb>
				<Link href="/paintings" passHref>
					<Breadcrumb.Item>All Paintings</Breadcrumb.Item>
				</Link>
				<Breadcrumb.Item active>Filters</Breadcrumb.Item>
			</Breadcrumb>
		</Container>
	)
}

export default PaintingsFilters