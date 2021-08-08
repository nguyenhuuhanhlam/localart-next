import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'
import { Nav,Navbar,Container } from 'react-bootstrap'

import { PaintingCard } from '../components'
import { HOST_URL,STRAPI_ENDPOINT } from '../lib/constants'
import styles from '../styles/App.module.scss'

SwiperCore.use([Pagination])

const App = ({ home_artists,home_paintings }) =>
{
	// console.log(home_paintings)
	return (
		<>
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				pagination={{
					clickable: true
				}}
			>
				{
					home_artists.map((v,k)=>{
						return (
							<SwiperSlide key={k}>
								<div
									className="d-block w-100"
									style={{
										backgroundImage: `url("${STRAPI_ENDPOINT+v.represent.media[0].formats.medium.url}")`,
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',
										height: '50vh'
									}}
								/>
							</SwiperSlide>
						)
					})
				}
			</Swiper>
			
			<div className={styles.helper} />
			<div className={styles.container}>

				<h5>News</h5>
				<h6>EDITOR'S PICK</h6>
				<div className={styles.editor_pick}>
					{
						home_paintings.map((v,k)=>{
							return (
								<PaintingCard key={k} item={v} options={{pick:true}} />
							)
						})
					}
				</div>

			</div>
		</>
	)
}

App.getInitialProps = async () =>
{
	const res = await fetch(`${HOST_URL}/api/get-homeviews`)
	const json = await res.json()

	// console.log(json.homeViews[0].artists)

	return {
		home_artists:json.homeViews[0].artists,
		home_paintings: json.homeViews[0].paintings
	}
}

export default App
