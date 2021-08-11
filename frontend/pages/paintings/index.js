import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Breadcrumb, Container } from 'react-bootstrap'
import { PaintingListInfinite,InformationIndication } from '../../components'

import { STRAPI_ENDPOINT } from '../../lib/constants'

const limit = 25

const Paintings = ({ count }) =>
{
	const [paintings,setPaintings] = useState([])
	const [start,setStart] = useState(0)
	const router = useRouter()

	useEffect(()=>{
		fetch(`/api/get-paintings?limit=${limit}&start=0`)
			.then(response=>response.json())
			.then(jsonData=>setPaintings(jsonData.paintings))
	},[])

	return (
		<Container className="p-3">
			<Breadcrumb>
				<Breadcrumb.Item active>All Paintings</Breadcrumb.Item>
				<Link href="/paintings/filters" passHref>
					<Breadcrumb.Item>Filters</Breadcrumb.Item>
				</Link>
			</Breadcrumb>
			<PaintingListInfinite
				items={ paintings }
				hasMore={ count>paintings.length ? true : false }
				next={()=>{
					fetch(`/api/get-paintings?limit=${limit}&start=${start+limit}`)
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

	return { count }
}

export default Paintings