import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Breadcrumb,Container,Row,Col,Button } from 'react-bootstrap'
import { STRAPI_ENDPOINT } from '../../lib/constants'
import styles from '../../styles/Cart.module.scss'

const TotalRow = ({cart}) => {
	return (
		<>
		<Row className="d-flex align-items-center justify-content-between">
			<Col></Col>
			<Col></Col>
			<Col className="d-flex justify-content-end">
				{ Number(cart.reduce((sum,v)=> sum+v.price,0)).toLocaleString('vi') }
			</Col>
			<Col></Col>
		</Row>
		<Row className="d-flex align-items-center justify-content-between">
			<Col></Col>
			<Col></Col>
			<Col className="d-flex justify-content-end">
				<Button className="btn btn-sm btn-success">Checkout</Button>
			</Col>
			<Col></Col>
		</Row>
		</>
	)
}

const Cart = () =>
{
	const cart = useSelector(state=>state.cart)

	return (
		<Container className="p-4 pt-5">
			<Breadcrumb>
				<Breadcrumb.Item active>Your Cart</Breadcrumb.Item>
			</Breadcrumb>

			<Container className="p-0">
				{
					cart.map((v,k)=>{
						return (
							<Row key={k} className="d-flex align-items-center justify-content-between">
								<Col>
									<Image
										unoptimized
										src={STRAPI_ENDPOINT+v.thumbnail.url}
										width={80} height={80}
										objectFit='cover'
										alt=""
									/>
								</Col>
								<Col>
									<div>{v.vn_title}</div>
									<div>{v.artist.full_name}</div>
								</Col>
								<Col className="d-flex justify-content-end">{ Number(v.price).toLocaleString('vi') }</Col>
								<Col><Button className="btn btn-sm btn-warning" style={{lineHeight:1,padding:0}}><i className="bi bi-x"/></Button></Col>
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