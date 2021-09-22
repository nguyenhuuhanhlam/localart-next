import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Breadcrumb,Container,Row,Col,Button,Form } from 'react-bootstrap'
import Image from 'next/image'
import { STRAPI_ENDPOINT } from '../../../lib/constants'
import { removeFromCart } from '../../../redux/cart.slice'

const PreOrder = () => {
	return (
		<Container className="p-4 pt-5">
			<Breadcrumb>
				<Link href="/cart" passHref>
					<Breadcrumb.Item>Your Cart</Breadcrumb.Item>
				</Link>
				<Breadcrumb.Item active>Pre-Order</Breadcrumb.Item>
			</Breadcrumb>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Your Email</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Address</Form.Label>
					<Form.Control type="text" placeholder="Enter address" />
				</Form.Group>

				<Form.Group className="mb-5">
					<Form.Label>Mobile phone</Form.Label>
					<Form.Control type="text" placeholder="Enter your phone number" />
				</Form.Group>

				<Form.Group className="mb-3">
					<Button className="d-flex justify-content-center">Submit</Button>
				</Form.Group>
			</Form>
		</Container>
	)
}

export default PreOrder