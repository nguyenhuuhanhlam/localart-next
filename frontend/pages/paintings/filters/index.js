import Link from 'next/link'
import { useState } from 'react'
import { Breadcrumb,Container,Row,Col } from 'react-bootstrap'

import { HOST_URL,STRAPI_ENDPOINT } from '../../../lib/constants'
import { Tag } from '../../../components'
import styles from '../../../styles/PaintingsFilters.module.scss'

const PaintingsFilters = ({typesData}) =>
{
	// console.log(typesData)
	const [filters,setFilters] = useState({ type:null,price:null })
	const [result,setResult] = useState([])

	const pricerangeList = [
		[1000,5000],
		[5000,100000]
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
								itemOnClick={
									()=>setFilters({ ...filters,type:v.en_name })
								}
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
								text={`${v[0]} - ${v[1]}`}
								itemOnClick={
									()=>setFilters({ ...filters,price:v[0] })
								}
							/>
						})
					}
				</div>

				<h6>Filter Result</h6>
				<div>{filters.type||'-'} | {filters.price||'-'}</div>
				<div>---</div>
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