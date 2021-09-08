import { useSelector } from 'react-redux'
import { Breadcrumb,Container,Row,Col } from 'react-bootstrap'

const Cart = () =>
{
	const cart = useSelector((state) => state.cart)
	console.log(cart)
	return (
		<Container className="p-3 pt-5">
			<Breadcrumb>
				<Breadcrumb.Item active>Your Cart</Breadcrumb.Item>
			</Breadcrumb>
		</Container>
	)
}

export default Cart