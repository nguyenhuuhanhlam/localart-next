import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'
import { Nav,Navbar,Container } from 'react-bootstrap'

import { PaintingCard,InformationIndication } from '../components'
import { STRAPI_ENDPOINT } from '../lib/constants'
import styles from '../styles/App.module.scss'

SwiperCore.use([Pagination])

const App = () =>
{
	const router = useRouter()
	const fetcher = url=>fetch(url).then(res=>res.json())

	const { data, error } = useSWR('/api/get-homeviews', fetcher)
	if (error) return <div className="pt-3"><InformationIndication text="Failed to load." iconName="bi-hdd-network" /></div>
	if (!data) return <div className="pt-3"><InformationIndication text="Loading..." iconName="bi-hourglass" /></div>

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
					data.homeViews[0].artists.map((v,k)=>{
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
								<div className={styles.slide_caption}>
									<span><strong>{ v.represent.vn_title.replace('|','\u2022') }</strong></span>
									<span>{ v.full_name }</span>
									<span>{ v.represent.painting_type.en_name }</span>
								</div>
							</SwiperSlide>
						)
					})
				}

			</Swiper>
			
			<div className={styles.helper} />
			<div className={styles.container}>
				<h5 className="pt-4">News</h5>
				<h6>EDITOR'S PICK</h6>
				<div className={`pt-3 ${styles.editor_pick}`}>
					{
						data.homeViews[0].paintings.map((v,k)=>{
							return (
								<PaintingCard
									key={k}
									item={v}
									options={{ pick:true }}
									itemOnClick={ ()=>router.push(`/paintings/d/${v.id}`) }
								/>
							)
						})
					}
				</div>
			</div>
		</>
	)
}

export default App
