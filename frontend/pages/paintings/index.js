import { useState } from 'react'
import { useRouter } from 'next/router'
import { Breadcrumb, Container } from 'react-bootstrap'
import { PaintingListInfinite } from '../../components'

import { HOST_URL,STRAPI_ENDPOINT } from '../../lib/constants'

const limit = 25

const Paintings = ({ data, count }) =>
{
	const [paintings,setPaintings] = useState(data)
	const [start,setStart] = useState(0)

	const router = useRouter()

	return (
		<Container className="p-3">
			<Breadcrumb>
				<Breadcrumb.Item active>All Paintings</Breadcrumb.Item>
				<Breadcrumb.Item href="/paintings/filters">Filters</Breadcrumb.Item>
			</Breadcrumb>
			<PaintingListInfinite
				items={ paintings }
				hasMore={ count>paintings.length ? true : false }
				next={()=>{
					fetch(`${HOST_URL}/api/get-paintings?limit=${limit}&start=${start+limit}`)
						.then(response=>response.json())
						.then(data=>setPaintings(paintings.concat(data.paintings)))

					setStart(start+limit)
				}}
				itemOnClick={ e=>router.push(`/paintings/d/${e.id}`) }
			/>
		</Container>
	)
}

Paintings.getInitialProps = async () =>
{
	const count_res = await fetch(`${STRAPI_ENDPOINT}/paintings/count`)
	const count = await count_res.json()

	const data_res = await fetch(`${HOST_URL}/api/get-paintings?limit=${limit}&start=0`)
	const data = await data_res.json()

	return { data: data.paintings, count }
}

export default Paintings