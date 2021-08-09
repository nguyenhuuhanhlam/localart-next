import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

import { HOST_URL } from '../../../lib/constants'
import { addToCart } from '../../../redux/cart.slice'

const PaintingDetail = ({ painting }) =>
{
	const router = useRouter()
	const dispatch = useDispatch()	
	const { id,vn_title,artist,painting_type,price } = painting

	return (
		<>
			<div>{painting.id}</div>
			<div>{painting.vn_title}</div>
			<Button
				onClick={
					()=>dispatch(addToCart({id,vn_title,artist,painting_type,price}))
				}
			>Add</Button>
		</>
	)
}

PaintingDetail.getInitialProps = async ({query}) =>
{
	const { id } = query
	const res = await fetch(`${HOST_URL}/api/get-painting-details?id=${id}`)
	const json = await res.json()
	return { painting: json.painting }
}

export default PaintingDetail