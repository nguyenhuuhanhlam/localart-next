import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Breadcrumb,Container,Row,Col } from 'react-bootstrap'

import { HOST_URL,STRAPI_ENDPOINT } from '../../../lib/constants'
import { Tag,PaintingListInfinite } from '../../../components'
import styles from '../../../styles/PaintingsFilters.module.scss'

const filtersQuery = (filters) =>
{
	const parseFilters = [
		filters.painting_type && { painting_type:filters.painting_type } || null,
		filters.price && {price_min:filters.price[0],price_max:filters.price[1]} || null
	]
	const mutateFilters = []

	parseFilters.filter(v=>v).map((v,k)=>{
		if (v.painting_type)
			mutateFilters.push(`painting_type=${v.painting_type}`)

		if(v.price_min>=0)
			mutateFilters.push(`price_min=${v.price_min}&price_max=${v.price_max}`)
	})

	return fetch(`/api/get-paintings-filters?${mutateFilters.join('&')}`)
		.then(res=>res.json())
}

const PaintingsFilters = ({typesData}) =>
{
	const [filters,setFilters] = useState({ painting_type:null,price:[0,0] })
	const [results,setResults] = useState([])
	const router = useRouter()

	const pricerangeList = [
		[0,5000000],
		[5000000,25000000],
		[25000000,100000000],
		[100000000,-1]
	]

	return (
		<Container className="p-3">
			
			<Breadcrumb>
				<Link href="/paintings" passHref>
					<Breadcrumb.Item>All Paintings</Breadcrumb.Item>
				</Link>
				<Breadcrumb.Item active>Filters</Breadcrumb.Item>
			</Breadcrumb>

			<div className={styles.wrapper}>
				<h6>By Type</h6>
				<div className={`d-flex flex-wrap ${styles.tags_container}`}>
					{
						typesData.map((v,k)=>{
							return <Tag
								key={k}
								text={v.en_name}
								itemOnClick={()=>{
									const _ = { ...filters,painting_type:v.en_name }
									filtersQuery(_).then(data=>{
										setFilters(_)
										setResults(data.paintings)
									})
								}}
							/>
						})
					}
				</div>
				
				<h6>By Prices</h6>
				<div className={`d-flex flex-wrap ${styles.tags_container}`}>
					{
						pricerangeList.map((v,k)=>{
							return <Tag
								key={k}
								text={`${v[0]} - ${ v[1]>0 ? v[1] : '+' }`}
								itemOnClick={()=>{
									const _ = { ...filters,price:v }
									filtersQuery(_).then(data=>{
										setFilters(_)
										setResults(data.paintings)
									})
									
								}}
							/>
						})
					}
				</div>

				<h6>Filter Result</h6>
				{
					results.length
					? <PaintingListInfinite items={results} itemOnClick={ e=>router.push(`/paintings/d/${e.id}`) } />
					: 'nothing show'
				}
				
			</div>

		</Container>
	)
}

export const getServerSideProps = async (context) =>
{
	try {
		const types_Response = await fetch(`${HOST_URL}/api/get-painting-types`)
		const typesData = await types_Response.json()

		return {
			props: {
				typesData: typesData.paintingTypes
			}
		}
	} catch (error) {

	}
}

export default PaintingsFilters