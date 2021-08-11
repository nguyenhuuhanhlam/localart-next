import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Breadcrumb,Container,Row,Col,Button } from 'react-bootstrap'

import { HOST_URL,STRAPI_ENDPOINT } from '../../../lib/constants'
import { addToCart } from '../../../redux/cart.slice'
import styles from '../../../styles/PaintingDetail.module.scss'

const PaintingDetail = () =>
{
	const router = useRouter()
	const dispatch = useDispatch()
	const [painting,setPainting] = useState(null)	
	const imgLoader = ({ src }) => STRAPI_ENDPOINT+src

	useEffect(()=>{
		
		if(!router.isReady)
			return 0

		fetch(`/api/get-painting-details?id=${router.query.id}`)
			.then(response=>response.json())
			.then(responseJson=>setPainting(responseJson.painting))

	}, [router.isReady])

	if (!painting)
		return 'pending...'

	return (
		<Container className="pt-3">

			<Row>
				<Col>
					<Breadcrumb>
						<Link href="/paintings" passHref>
							<Breadcrumb.Item>All Paintings</Breadcrumb.Item>
						</Link>
						<Breadcrumb.Item active>Details</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
			</Row>

			<Row>
				<Col md="auto">
					<Image
						loader={imgLoader}
						alt=""
						src={ painting.media[0].formats.small.url }
						width={414} height={414}
						objectFit='cover'
					/>
				</Col>
				<Col>
					<div>
						<div className={styles.painting_title}>{ painting.vn_title.replace('|','\u2022') }</div>
						<div className={styles.artist}>{ painting.artist.full_name }</div>
						<div className={styles.painting_type}>{ painting.painting_type.en_name }</div>

						<div className={styles.year}>
							<span>Year</span>
							<span>{ painting.year||null }</span>
						</div>
						<div className={styles.dimension}>
							<span>Dimension</span>
							<span>{ painting.width }cm x { painting.height }cm</span>
						</div>
						<div className={styles.price}>
							<span>Price</span>
							<span>{ Number(painting.price).toLocaleString(painting.price_unit||'vi') }</span>
						</div>
						<div className={styles.action}>
							<Button
								className="btn btn-info btn-sm"
								onClick={
									()=>dispatch(addToCart({
										id: painting.id,
										vn_title: painting.vn_title,
										artist: painting.artist,
										painting_type: painting.painting_type,
										price: painting.price
									}))
								}
							>
								Add To Cart
							</Button>
						</div>
					</div>
				</Col>
			</Row>

			<Row>
				<Col>
					<h5 className="pt-4">
						<span>Other Paintings by </span>
						<span className={styles.by_artist}>{ painting.artist.full_name }</span>
					</h5>
				</Col>
			</Row>

			<Row>
				<Col></Col>
			</Row>
		</Container>
	)
}

export default PaintingDetail