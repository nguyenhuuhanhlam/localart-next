import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Breadcrumb, Container } from 'react-bootstrap'
import { PaintingListInfinite,InformationIndication } from '../../components'

import { HOST_URL,STRAPI_ENDPOINT } from '../../lib/constants'

const limit = 25

const Paintings = ({ count, paintingsData, __ready=true }) =>
{
	const [paintings,setPaintings] = useState(paintingsData)
	const [start,setStart] = useState(0)
	const router = useRouter()

	if (!__ready)
		return <div className="pt-3"><InformationIndication text="Server Not Responding." iconName="bi-hdd-network" /></div>

	return (
		<Container className="p-3 pt-5">
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

export const getServerSideProps = async (context) =>
{
	try {
		const count_Response = await fetch(`${STRAPI_ENDPOINT}/paintings/count`)
		const count = await count_Response.json()

		const paintings_Response = await fetch(`${HOST_URL}/api/get-paintings?limit=${limit}&start=0`)
		const paintingsData = await paintings_Response.json()

		return {
			props: {
				__ready: true,
				count,
				paintingsData: paintingsData.paintings
			}
		}
	}
	catch (error) {
		return {props:{__ready:false}}
	}
}

export default Paintings