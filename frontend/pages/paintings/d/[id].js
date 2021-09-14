import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Breadcrumb,Container,Row,Col,Button } from 'react-bootstrap'

import { PaintingListInfinite } from '../../../components'
import { HOST_URL, STRAPI_ENDPOINT } from '../../../lib/constants'
import { addToCart } from '../../../redux/cart.slice'
import styles from '../../../styles/PaintingDetail.module.scss'

const PaintingDetail = ({ detailData,paintingsByArtistData }) =>
{
	const dispatch = useDispatch()
	const router = useRouter()

	return (
		<Container className="p-4 pt-5">
			<Row>
				<Col>
					<Breadcrumb>
						<Link href="/paintings" passHref>
							<Breadcrumb.Item>All Paintings</Breadcrumb.Item>
						</Link>
						<Link href="/paintings/filters" passHref>
							<Breadcrumb.Item>Filters</Breadcrumb.Item>
						</Link>
						<Breadcrumb.Item active>Details</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
			</Row>

			<Row>
				<Col md="auto">
					<div>
						<Image
							unoptimized
							alt=""
							src={ STRAPI_ENDPOINT+detailData.media[0].formats.small.url }
							width={414} height={414}
							objectFit='cover'
						/>
					</div>
					<Button className="btn-sm btn-info">
						<i className="bi bi-arrows-fullscreen"></i>
					</Button>
				</Col>
				<Col>
					<div className={styles.wrapper}>
						<div className={styles.painting_title}>{ detailData.vn_title.replace('|','\u2022') }</div>
						<div className={styles.artist}>{ detailData.artist.full_name }</div>
						<div className={styles.painting_type}>{ detailData.painting_type.en_name }</div>

						<div className={styles.year}>
							<span>Year</span>
							<span>{ detailData.year||null }</span>
						</div>
						<div className={styles.dimension}>
							<span>Dimension</span>
							<span>{ detailData.width }cm x { detailData.height }cm</span>
						</div>
						<div className={styles.price}>
							<span>Price</span>
							<span>{ Number(detailData.price).toLocaleString(detailData.price_unit||'vi') }</span>
						</div>
						<div className={styles.action}>
							<Button
								className="btn btn-info btn-sm"
								onClick={
									()=>dispatch(addToCart({
										id: detailData.id,
										vn_title: detailData.vn_title,
										artist: detailData.artist,
										painting_type: detailData.painting_type,
										price: detailData.price,
										thumbnail: detailData.media[0].formats.thumbnail
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
					<h5 className="pt-5 pb-3">
						<span>Other Paintings by </span>
						<span className={styles.by_artist}>{ detailData.artist.full_name }</span>
					</h5>
				</Col>
			</Row>

			<Row>
				<Col>
					<PaintingListInfinite
						items={paintingsByArtistData}
						itemOnClick={ e=>router.push(`/paintings/d/${e.id}`) }
					/>
				</Col>
			</Row>
		</Container>
	)
}

/*
const PaintingDetail = ({ detailData,paintingsByArtistData }) => {
	console.log(detailData,paintingsByArtistData)
	return 'TEST.'
}
*/

export const getServerSideProps = async (context) =>
{
	try {
		const { id } = context.params
		
		const painting_Response = await fetch(`${HOST_URL}/api/get-painting-details?id=${id}`)
		const detailData = await painting_Response.json()

		const paintingsByArtist_Response =
			await fetch(`${HOST_URL}/api/get-paintings-filters?artist_id=${detailData.painting.artist.id}`)
		const paintingsByArtistData = await paintingsByArtist_Response.json()
			
		return {
			props: {
				detailData: detailData.painting,
				paintingsByArtistData: paintingsByArtistData.paintings
			}
		}
	} catch (error) {
		
	}
}

export default PaintingDetail