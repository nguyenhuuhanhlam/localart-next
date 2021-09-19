import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Breadcrumb,Container,Row,Col,Button } from 'react-bootstrap'
import Image from 'next/image'
import { STRAPI_ENDPOINT } from '../../../lib/constants'
import { removeFromCart } from '../../../redux/cart.slice'

const PreOrder = () => {
	return 'Pre'
}

export default PreOrder