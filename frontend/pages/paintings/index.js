import { useRouter } from 'next/router'
import { Breadcrumb, Container } from 'react-bootstrap'
import { PaintingListInfinite } from '../../components'

const Paintings = ({ paintings }) =>
{
	const router = useRouter()

	return (
		<Container className="p-3">
			<Breadcrumb>
				<Breadcrumb.Item active>All Paintings</Breadcrumb.Item>
				<Breadcrumb.Item href="">Filters</Breadcrumb.Item>
			</Breadcrumb>
			<PaintingListInfinite
				items={paintings}
				itemOnClick={ e=>router.push(`/paintings/d/${e.id}`) }
			/>
		</Container>
	)
}

Paintings.getInitialProps = async () =>
{
	const res = await fetch('http://localhost:3000/api/get-paintings')
	const json = await res.json()
	return { paintings: json.paintings }
}

export default Paintings