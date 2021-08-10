import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'
import { Nav,Navbar,Container } from 'react-bootstrap'

import { PaintingCard,InformationIndication } from '../components'
import { HOST_URL,STRAPI_ENDPOINT } from '../lib/constants'
import styles from '../styles/App.module.scss'

SwiperCore.use([Pagination])

const App = () =>
{
	const router = useRouter()
	const [data,setData] = useState({ home_artists:[], home_paintings:[] })

	useEffect(()=>{
		fetch(`${HOST_URL}/api/get-homeviews`)
			.then(response=>response.json())
			.then(jsonData=>{
				setData({
					home_artists:jsonData.homeViews[0].artists,
					home_paintings: jsonData.homeViews[0].paintings
				})
			})
	},[])

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
					data.home_artists.length
					? data.home_artists.map((v,k)=>{
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
					: <InformationIndication text="Pending..." iconName="bi-hourglass" />
				}

			</Swiper>
			
			<div className={styles.helper} />
			<div className={styles.container}>

				<h5 className="pt-4">News</h5>
				<h6>EDITOR'S PICK</h6>
				<div className={styles.editor_pick}>
					{
						data.home_paintings.length
						? data.home_paintings.map((v,k)=>{
							return (
								<PaintingCard
									key={k}
									item={v}
									options={{pick:true}}
									itemOnClick={ ()=>router.push(`/paintings/d/${v.id}`) }
								/>
							)
						})
						: <InformationIndication text="Pending..." iconName="bi-hourglass" />
					}
				</div>

			</div>
		</>
	)
}

export default App
