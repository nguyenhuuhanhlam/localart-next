import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { Breadcrumb,Container,Row,Col,Button } from 'react-bootstrap'
import { STRAPI_ENDPOINT } from '../../lib/constants'
import { removeFromCart } from '../../redux/cart.slice'
import styles from '../../styles/Cart.module.scss'

const TotalRow = ({cart}) => {
	return (
		<>
			<br/>
			<Row className="pt-4" style={{borderTop:'dotted 1px #ccc'}}>
				<Col className="d-flex justify-content-center">
					<span className="px-1">Total :</span>
					<span><strong>{ Number(cart.reduce((sum,v)=> sum+v.price,0)).toLocaleString('vi') }</strong></span>
				</Col>
				<Col className="d-flex justify-content-center">
					<Button className="btn btn-sm btn-success" style={{ lineHeight:1,padding:2 }}>Checkout</Button>
				</Col>
			</Row>
		</>
	)
}

const Cart = () =>
{
	const cart = useSelector(state=>state.cart)
	const dispatch = useDispatch()

	// console.log(cart)

	return (
		<Container className="p-4 pt-5">
			<Breadcrumb>
				<Breadcrumb.Item active>Your Cart</Breadcrumb.Item>
			</Breadcrumb>

			<Container className="p-0">
				{
					cart.map((v,k)=>{
						return (
							<Row key={k} className="d-flex align-items-center justify-content-between pt-2 pb-2">
								<Col className="d-flex justify-content-center" style={{minWidth:80}}>
									<Image
										unoptimized
										src={STRAPI_ENDPOINT+v.thumbnail.url}
										width={80} height={80}
										objectFit='cover'
										alt=""
									/>
								</Col>
								<Col className={styles.txt}>
									<div className="d-block text-truncate">{v.vn_title}</div>
									<div className="d-block text-truncate" style={{fontSize:10}}>{v.artist.full_name}</div>
								</Col>
								<Col className="d-flex justify-content-end">{ Number(v.price).toLocaleString('vi') }</Col>
								<Col className="d-flex justify-content-center">
									<Button
										className="btn btn-sm btn-warning"
										style={{ lineHeight:1,padding:0 }}
										onClick={ ()=>{
												if (confirm('Remove this item?'))
													dispatch(removeFromCart({ id:v.id }))
											}
										}
									>
										<i className="bi bi-x"/>
									</Button>
								</Col>
							</Row>
						)
					})
				}

				{
					cart.length
					? <TotalRow cart={cart} />
					: null
				}
			</Container>
		</Container>
	)
}

export default Cart

/*

*/