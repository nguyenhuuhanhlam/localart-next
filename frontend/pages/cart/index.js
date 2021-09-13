import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Breadcrumb,Container,Row,Col } from 'react-bootstrap'

const Cart = () =>
{
	const cart = useSelector(state=>state.cart)

	console.log(cart)

	return (
		<Container className="p-3 pt-5">
			<Breadcrumb>
				<Breadcrumb.Item active>Your Cart</Breadcrumb.Item>
			</Breadcrumb>

			<Container>
				{
					cart.map((v,k)=>{
						return (
							<Row key={k}>
								<Col>{v.thumbnail.url}</Col>
								<Col>{v.vn_title}</Col>
								<Col>{v.price}</Col>
								<Col>delete!</Col>
							</Row>
						)
					})
				}
			</Container>
		</Container>
	)
}

export default Cart